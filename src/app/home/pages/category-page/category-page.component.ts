import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialService } from 'src/app/core/services/material.service';
import { StoreService } from 'src/app/core/services/store.service';
import { TuitionService } from 'src/app/core/services/tuition.service';

@Component({
	selector: 'app-category-page',
	templateUrl: './category-page.component.html',
	styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

	title: string;
	isTuition: boolean = true;
	tuitionList = [];
	materialList = [];

	constructor(
		private router: ActivatedRoute,
		private store: StoreService,
		private tuitionService: TuitionService,
		private materialService: MaterialService
	) {
		this.router.params.subscribe(params => {
			this.loadPage(params.title);
		});
	}

	ngOnInit(): void { }

	loadPage(title: string) {
		this.title = title;
		const userId = this.store.getData('userId') || 1;
		const classId = this.getClassId(this.store.getData('categories'), title);

		this.tuitionService.getTuitionsByCategory({ userId, classId }).then(
			(response: any) => {
				if (response.status === 200) {
					this.setTuitions(response.result);
				} else {
					this.tuitionList = [];
				}
			},
			error => {
				console.log(error);
				this.tuitionList = [];
			}
		);

		this.materialService.getMaterialsByCategory({ userId, classId }).then(
			(response: any) => {
				if (response.status === 200) {
					this.materialList = response.result;
				} else {
					this.materialList = [];
				}
			},
			error => {
				console.log(error);
				this.materialList = [];
			}
		);
	}

	getClassId(categories: any, title: string) {
		const getString = (str: string): string => str.toLowerCase().replace(/ /g, '-');
		const categoryList = categories.map(item => item.subClasses).flat();
		const currentCategory = categoryList.find(item => getString(item.subClass).includes(getString(title)));
		return currentCategory && currentCategory.classId;
	}

	setTuitions(tutions: any) {
		this.tuitionList = tutions.filter(item => Math.ceil((+new Date(item.fromDate.split('-').reverse().join('/')) - +new Date()) / (1000 * 60 * 60 * 24)) >= 0);
	}
}
