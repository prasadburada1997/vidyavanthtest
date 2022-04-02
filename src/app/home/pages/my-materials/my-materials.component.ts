import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MaterialService } from 'src/app/core/services/material.service';
import { StoreService } from 'src/app/core/services/store.service';

const ITEMS_IN_PAGE = 10;

@Component({
	selector: 'app-my-materials',
	templateUrl: './my-materials.component.html',
	styleUrls: ['./my-materials.component.scss']
})
export class MyMaterialsComponent implements OnInit, OnChanges {

	@Input() materialList: any;
	isLoading: boolean = true;
	allMaterials: any;
	materialsToDisplay = [];
	pageNumber: number = 0;

	constructor(private store: StoreService, private materialService: MaterialService) { }

	ngOnInit(): void {
		if (!this.materialList) {
			const userId = this.store.getData('userId');
			this.materialService.getMyMaterials({ userId }).then(
				(response: any) => {
					if (response.status === 200) {
						const materialsData = response.result;
						this.allMaterials = materialsData;
						this.materialsToDisplay = materialsData;
						this.isLoading = false;
					}
				},
				error => {
					console.log(error);
				}
			);
		} else if (this.materialList.length) {
			this.allMaterials = this.materialList;
			this.materialsToDisplay = this.materialList;
			this.isLoading = false;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes.materialList.isFirstChange()) {
			const materialsData = changes.materialList.currentValue;
			this.allMaterials = materialsData;
			this.materialsToDisplay = materialsData;
			this.isLoading = false;
		}
	}

	onFilter(filters: { name: string, selected: { text: string, value: string } }[]) {
		this.materialsToDisplay = this.allMaterials;
		this.pageNumber = 0;
		filters.forEach(filter => {
			const filterResults = (name: string, selected: { text: string, value: string }) => {
				switch (name) {
					case 'rating':
						return this.materialsToDisplay.filter(material => material.noOfRatings && material["averageRating"] > +selected.value);
					case 'price':
						return this.materialsToDisplay.filter(material => +selected.value ? material.price > 0 : material.price === 0);
				}
			};
			this.materialsToDisplay = filterResults(filter.name, filter.selected);
		});
	}

	getNumberOfPages(): number {
		return Math.ceil(this.materialsToDisplay.length / ITEMS_IN_PAGE);
	}

	handlePageChange(pageNumber: number) {
		this.pageNumber = pageNumber;
		window.scroll({
			top: 0,
			behavior: 'smooth'
		});
	}

	getMaterialsToDisplay() {
		return this.materialsToDisplay.slice(this.pageNumber * ITEMS_IN_PAGE, this.pageNumber * ITEMS_IN_PAGE + ITEMS_IN_PAGE);
	}
}
