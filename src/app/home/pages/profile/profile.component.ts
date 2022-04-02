import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	stateList: any;
	countryList: any;
	gender: string;
	firstName: string;
	lastName: string;
	stateId: number;
	countryId: number;
	isBtnClicked: boolean;
	success: boolean;
	fullname: string;
	initials: string;
	categoryName: string;
	classId: number;
	categoryList: any;
	subcatList: any;
	interestedSubjects: string;
	academicSuccess: boolean;
	title: string;
	subtitle: string;
	selectedMenu: string = 'basic';
	titleSubtitleList = {
		basic: { title: 'Basic Profile', subtitle: 'Update information about yourself' },
		academic: { title: 'Academic Profile', subtitle: 'Add your primary interested class or category' },
		pass: { title: 'Change Password', subtitle: '' },
		email: { title: 'Change Email ID', subtitle: '' },
		phone: { title: 'Change Phone Number', subtitle: '' },
	};

	constructor(
		private commonService: CommonService,
		private store: StoreService,
		private authService: AuthenticationService
	) { }

	ngOnInit(): void {
		const userData = this.store.getData('userData');
		this.setTitleAndSubtitle();
		this.fillUserData(userData);
		this.fillAcademicData();
		this.commonService.getCountriesAndStates().then(
			(response: any) => {
				if (response.status === 200) {
					this.countryList = response.result;
					if (userData) {
						this.countryId = userData.countryId;
						this.changeStates(this.countryId);
						this.stateId = userData.stateId;
					}
				}
			},
			error => console.log(error)
		);
	}

	fillUserData(userData: any) {
		if (userData) {
			this.firstName = userData.firstName;
			this.lastName = userData.lastName;
			this.gender = userData.gender;
			this.fullname = userData.firstName + ' ' + userData.lastName;
			this.initials = this.fullname.match(/\b\w/g).join('');
		}
	}

	changeStates(countryId: number) {
		this.stateList = this.countryList.find(item => item.countryId === +countryId).states;
	}

	onSubmit(form: NgForm) {
		this.isBtnClicked = true;
		const { firstName, lastName, gender, stateId, countryId } = form.value;
		const userId = this.store.getData('userId');
		const userType = this.store.getData('userType');
		const data = { firstName, lastName, gender, userId, userType, stateId: +stateId, countryId: +countryId };
		this.authService.updateProfile(data).then(
			(response: any) => {
				if (response.status === 200) {
					this.isBtnClicked = false;
					this.success = true;
					this.updateData(data);
				}
			},
			error => {
				console.log(error);
				this.isBtnClicked = false;
			}
		);
	}

	updateData(data: any) {
		const userData = this.store.getData('userData');
		userData.firstName = data.firstName;
		userData.lastName = data.lastName;
		userData.gender = data.gender;
		userData.stateId = data.stateId;
		userData.countryId = data.countryId;
		this.store.saveData('userData', userData);
	}

	onMenuChange(selection: string) {
		this.selectedMenu = selection;
		this.setTitleAndSubtitle();
	}

	setTitleAndSubtitle() {
		this.title = this.titleSubtitleList[this.selectedMenu].title;
		this.subtitle = this.titleSubtitleList[this.selectedMenu].subtitle;
	}

	fillAcademicData() {
		this.categoryList = this.store.getData('categories');
		const savedData = this.store.getData('academicData');
		if (savedData && Object.keys(savedData).length) {
			this.categoryName = savedData.mainClass;
			this.changeSubCategories(this.categoryName);
			this.classId = this.subcatList.find(item => item.subClass === savedData.subClass).classId;
			this.interestedSubjects = savedData.interestedSubjects;
		} else {
			this.categoryName = '';
			this.classId = null;
			this.interestedSubjects = '';
		}
	}

	changeSubCategories(categoryName: string) {
		this.subcatList = this.categoryList.find(item => item.mainClass === categoryName).subClasses;
		this.classId = null;
	}

	onAcademicSubmit(form: NgForm) {
		this.isBtnClicked = true;
		const userId = this.store.getData('userId');
		const { classId, categoryName, interestedSubjects } = form.value;
		this.authService.saveProfile({ userId, classId, interestedSubjects }).then(
			(response: any) => {
				if (response.status === 201) {
					this.isBtnClicked = false;
					this.academicSuccess = true;
					this.updateAcademicData({ classId, categoryName, interestedSubjects });
				}
			},
			error => {
				console.log(error);
				this.isBtnClicked = false;
			}
		);
	}

	updateAcademicData(data: any) {
		const [interestedSubjects, mainClass] = [data.interestedSubjects, data.categoryName];
		const subClass = this.subcatList.find(item => item.classId === +data.classId).subClass;
		this.store.saveData('academicData', { interestedSubjects, mainClass, subClass });
	}
}
