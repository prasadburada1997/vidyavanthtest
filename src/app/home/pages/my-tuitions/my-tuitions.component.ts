import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';
import { TuitionService } from 'src/app/core/services/tuition.service';

const ITEMS_IN_PAGE = 10;

@Component({
	selector: 'app-my-tuitions',
	templateUrl: './my-tuitions.component.html',
	styleUrls: ['./my-tuitions.component.scss']
})
export class MyTuitionsComponent implements OnInit, OnChanges {

	@Input() tuitionList: any;
	isLoading: boolean = true;
	allTuitions: any;
	tuitionsToDisplay = [];
	pageNumber: number = 0;

	constructor(private store: StoreService, private tuitionService: TuitionService) { }

	ngOnInit(): void {
		if (!this.tuitionList) {
			const userId = this.store.getData('userId');
			const userType = this.store.getData('userType');
			this.tuitionService.getMyTuitions({ userId, userType }).then(
				(response: any) => {
					if (response.status === 200) {
						let tuitionsData = response.result;
						this.store.saveData('my-tuitions', tuitionsData);
						this.allTuitions = tuitionsData;
						this.tuitionsToDisplay = tuitionsData;
						this.isLoading = false;
					}
				},
				error => {
					console.log(error);
				}
			);
		} else if (this.tuitionList.length) {
			this.allTuitions = this.tuitionList;
			this.tuitionsToDisplay = this.tuitionList;
			this.isLoading = false;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes.tuitionList.isFirstChange()) {
			let tuitionsData = changes.tuitionList.currentValue;
			this.allTuitions = tuitionsData;
			this.tuitionsToDisplay = tuitionsData;
			this.isLoading = false;
		}
	}

	onFilter(filters: { name: string, selected: { text: string, value: string } }[]) {
		this.tuitionsToDisplay = this.allTuitions;
		this.pageNumber = 0;
		filters.forEach(filter => {
			const filterResults = (name: string, selected: { text: string, value: string }) => {
				switch (name) {
					case 'rating':
						return this.tuitionsToDisplay.filter(tuition => tuition.ratingsCount && tuition["averageRating"] > selected.value);
					case 'time':
						return this.tuitionsToDisplay.filter(tuition => {
							const diff = 12 - tuition.timings.split('-')[0].split(':')[0];
							return selected.value === 'am' ? diff > 0 : diff <= 0;
						});
					case 'day':
						return this.tuitionsToDisplay.filter(tuition => {
							const days = Math.ceil((+new Date(tuition.fromDate.split('-').reverse().join('/')) - +new Date()) / (1000 * 60 * 60 * 24));
							switch (+selected.value) {
								case 0: return days < 5;
								case 1: return days >= 5 && days < 11;
								case 2: return days >= 11 && days < 15;
								case 3: return days >= 15;
							}
						});
					case 'level':
						return this.tuitionsToDisplay.filter(tuition => tuition.level.toLowerCase().includes(selected.value));
				}
			};
			this.tuitionsToDisplay = filterResults(filter.name, filter.selected);
		});
	}

	getNumberOfPages(): number {
		return Math.ceil(this.tuitionsToDisplay.length / ITEMS_IN_PAGE);
	}

	handlePageChange(pageNumber: number) {
		this.pageNumber = pageNumber;
		window.scroll({
			top: 0,
			behavior: 'smooth'
		});
	}

	getTuitionsToDisplay() {
		return this.tuitionsToDisplay.slice(this.pageNumber * ITEMS_IN_PAGE, this.pageNumber * ITEMS_IN_PAGE + ITEMS_IN_PAGE);
	}
}
