import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

	@Input() miniCategories: boolean;
	@Output() closeSidebar = new EventEmitter();
	@ViewChild('catList') catList: ElementRef;
	@ViewChild('miniSubCatList') miniSubCatList: ElementRef;
	categoriesList = [];
	classesList = [];
	isCategoriesOpen: boolean = false;
	openCategories: boolean = false;
	mainClassName: string;

	constructor(
		private router: Router,
		private commonService: CommonService,
		private store: StoreService
	) { }

	ngOnInit(): void {
		this.commonService.getAllCategories().then(
			(response: any) => {
				if (response.status === 200) {
					this.categoriesList = response.result;
					this.saveCategories(response.result);
				}
			},
			error => console.log(error)
		);
	}

	selectCurrentItem(elementList: any, index: number) {
		elementList.forEach(item => item.classList.remove('active'));
		elementList.item(index).classList.add('active');
	}

	trackByFn(item: any) {
		return item.name;
	}

	getSubCat(subClasses: any, index: number, mainClass: string) {
		if (mainClass) {
			this.mainClassName = mainClass;
			this.miniSubCatList.nativeElement.classList.add('active');
		} else {
			const catListElements = this.catList.nativeElement.querySelectorAll('li');
			this.selectCurrentItem(catListElements, index);
		}
		this.classesList = subClasses;
	}

	openPage(urlString: string) {
		this.router.navigate(['/categories/' + urlString]);
		this.miniCategories ? this.handleSideBarClose() : (this.openCategories = false);
	}

	handleSideBarClose() {
		this.isCategoriesOpen = false;
		this.miniSubCatList.nativeElement.classList.remove('active');
		this.closeSidebar.emit();
	}

	saveCategories(data: any) {
		this.store.saveData('categories', data);
	}
}
