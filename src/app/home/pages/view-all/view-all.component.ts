import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-view-all',
	templateUrl: './view-all.component.html',
	styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {

	isTuition: boolean;
	tuitionList: any = [];
	materialList: any = [];
	title: string;
	isError: boolean;

	constructor(private store: StoreService) { }

	ngOnInit(): void {
		const data = this.store.getData('viewAll');
		if (data) {
			this.isTuition = data.isTuition;
			data.isTuition ? this.tuitionList = data.list : this.materialList = data.list;
			this.title = data.title;
		} else {
			this.isError = true;
		}
	}
}
