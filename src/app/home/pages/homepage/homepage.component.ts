import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

	isLoading: boolean = true;
	isLogin: boolean;
	banner: string;
	categories: any;
	tuitions: any;
	materials: any;
	selectedCategory: any = {};

	newBanner: string;
	academic: any;
	entrance: any;
	job: any;
	selectedAcademic: any = {};
	selectedEntrance: any = {};
	selectedJob: any = {};
	isStudentToggle: boolean = true;

	showAcademicPopup: boolean = false;
	categoryList: any;
	categoryName: string;
	classId: number;
	subcatList: any;
	isBtnClicked: boolean;

	constructor(
		private store: StoreService,
		private authService: AuthenticationService,
		private commonService: CommonService,
		private activatedRouter: ActivatedRoute,
	) { }

	ngOnInit(): void {
		const userId = this.store.getData('userId');
		if (userId) {
			this.isLogin = true;
			const userType = this.store.getData('userType');
			this.checkForAcademicData();
			this.commonService.getStudentHomepage({ userId, userType }).then(
				(response: any) => {
					if (response.status === 200) {
						this.setHomepageData(response.result[0]);
						this.isLoading = false;
					}
				},
				error => {
					console.log(error);
				}
			);
		} else {
			this.commonService.getNewUserHomepage({ key: 'value' }).then(
				(response: any) => {
					if (response.status === 200) {
						this.setHomepageForNewUser(response.result[0]);
						this.isLoading = false;
						this.activatedRouter.queryParams.subscribe(params => {
							setTimeout(() => {
								params["features"] === "true" && this.scrollToFeatures();
							}, 0);
						});
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	}

	changeCategory(selection: any, index: number) {
		switch (index) {
			case 1:
				this.selectedAcademic = selection;
				break;
			case 2:
				this.selectedEntrance = selection;
				break;
			case 3:
				this.selectedJob = selection;
				break;
			case 4:
				this.selectedCategory = selection;
				break;
		}
	}

	setHomepageData(data: any) {
		this.banner = data.banners[0].banner || '';
		this.categories = data.featuredCategories || [];
		this.tuitions = data.tutions || [];
		this.materials = data.materials || [];
		this.selectedCategory = this.categories[0] || { tutions: [] };
	}

	setHomepageForNewUser(data: any) {
		this.newBanner = data.banners[0].banner || '';
		this.academic = data.academic || [];
		this.entrance = data.entrance || [];
		this.job = data.job || [];

		this.selectedAcademic = this.academic[0] || { tutions: [] };
		this.selectedEntrance = this.entrance[0] || { tutions: [] };
		this.selectedJob = this.job[0] || { tutions: [] };
	}

	scrollToFeatures() {
		const features = document.getElementById('features');
		const position = features.getBoundingClientRect().top - 80;
		window.scrollTo({
			top: position,
			behavior: 'smooth'
		});
	}

	checkForAcademicData() {
		const { profileStatus } = this.store.getData('userData');
		if (profileStatus === 1) {
			this.showAcademicPopup = true;
			this.categoryList = this.store.getData('categories');
			this.categoryName = '';
			this.classId = null;
		}
	}

	changeSubCategories(categoryName: string) {
		this.subcatList = this.categoryList.find(item => item.mainClass === categoryName).subClasses;
		this.classId = null;
	}

	onAcademicSubmit(form: NgForm) {
		this.isBtnClicked = true;
		const userId = this.store.getData('userId');
		const { classId, categoryName } = form.value;
		this.authService.saveProfile({ userId, classId }).then(
			(response: any) => {
				if (response.status === 201) {
					this.isBtnClicked = false;
					this.showAcademicPopup = false;
					this.updateAcademicData({ classId, categoryName });
					window.location.reload();
				}
			},
			error => {
				console.log(error);
				this.isBtnClicked = false;
			}
		);
	}

	updateAcademicData(data: any) {
		const mainClass = data.categoryName;
		const subClass = this.subcatList.find(item => item.classId === +data.classId).subClass;
		let userData = this.store.getData('userData');
		userData.profileStatus = 2;
		this.store.saveData('userData', userData);
		this.store.saveData('academicData', { interestedSubjects: '', mainClass, subClass });
	}
}
