import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

	@Input() results: number;
	@Input() forTuition: boolean;
	@Output() onFilter: EventEmitter<any> = new EventEmitter();
	ratingMenu: any;
	timeMenu: any;
	dayMenu: any;
	levelMenu: any;
	priceMenu: any;
	filterData: any;

	constructor() { }

	ngOnInit(): void {
		this.initialize();
	}

	initialize() {
		this.filterData = [];
		this.ratingMenu = {
			name: 'rating',
			selected: { text: 'rating' },
			list: [{ text: '3.0+ rating', value: '3' },
			{ text: '3.5+ rating', value: '3.5' },
			{ text: '4.0+ rating', value: '4' },
			{ text: '4.5+ rating', value: '4.5' }],
		};
		this.timeMenu = {
			name: 'time',
			selected: { text: 'time' },
			list: [{ text: 'AM', value: 'am' },
			{ text: 'PM', value: 'pm' }],
		};
		this.dayMenu = {
			name: 'day',
			selected: { text: 'starts in' },
			list: [{ text: 'within 5 days', value: '0' },
			{ text: '5-10 days', value: '1' },
			{ text: '11-15 days', value: '2' },
			{ text: 'after 15 days', value: '3' }],
		};
		this.levelMenu = {
			name: 'level',
			selected: { text: 'level' },
			list: [{ text: 'beginner level', value: 'beginner' },
			{ text: 'intermediate level', value: 'intermediate' },
			{ text: 'expert level', value: 'expert' },
			{ text: 'all levels', value: '' }],
		};
		this.priceMenu = {
			name: 'price',
			selected: { text: 'price' },
			list: [{ text: 'free', value: '0' },
			{ text: 'paid', value: '1' }]
		};
	}

	onChange(changedData: { name: string, selected: any }) {
		const index = this.filterData.findIndex(item => item.name === changedData.name);
		if (index === -1) this.filterData.push(changedData);
		else this.filterData[index] = changedData;

		this[changedData.name + "Menu"].selected = changedData.selected;
		this.onFilter.emit(this.filterData);
	}

	handleReset() {
		this.initialize();
		this.onFilter.emit(this.filterData);
	}
}
