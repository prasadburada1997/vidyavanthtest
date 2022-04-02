import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	userType: number;
	header = 'Sign Up';
	gender: string = "";
	countryId: string = "";
	stateId: string = "";
	countryList: any;
	stateList: any;
	duplicatePhone: boolean;
	duplicateEmail: boolean;
	isPasswordVisible: boolean = false;
	isBtnClicked: boolean = false;
	showOTP: boolean = false;

	constructor(
		private commonService: CommonService,
		private authService: AuthenticationService,
		private store: StoreService,
		private activatedRouter: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.activatedRouter.queryParams.subscribe(params => {
			this.userType = params["isTutor"] === "true" ? 2 : 1;
		});
		this.commonService.getCountriesAndStates().then(
			(response: any) => {
				if (response.status === 200) {
					this.countryList = response.result;
				}
			}, err => console.log(err)
		);
	}

	showHidePassword(): void {
		this.isPasswordVisible = !this.isPasswordVisible;
	}

	changeStates(countryId: number) {
		this.stateList = this.countryList.find(item => item.countryId === +countryId).states;
	}

	onSubmit(form: NgForm) {
		this.isBtnClicked = true;
		const { firstName, lastName, gender, userType, phoneNumber, email, password, countryId, stateId } = form.value;
		const data = {
			firstName,
			lastName,
			gender,
			userType,
			email,
			password,
			phoneNumber: phoneNumber.toString(),
			countryId: +countryId,
			stateId: +stateId
		};
		this.authService.signup(data).then(
			(response: any) => {
				if (response.status === 200) {
					this.saveUserData(response.result);
					this.sendOTP(response.result.userId);
				} else if (response.status === 400) {
					if (response.message.toLowerCase().includes("phone number")) {
						this.duplicatePhone = true;
					} else if (response.message.toLowerCase().includes("email")) {
						this.duplicateEmail = true;
					}
					this.isBtnClicked = false;
				}
			},
			error => {
				console.log(error);
				this.isBtnClicked = true;
			}
		);
	}

	saveUserData(data: any) {
		const { userId, userType, firstName, lastName, gender, phoneNumber, email, countryId, stateId, profileStatus } = data;
		const userData = { firstName, lastName, gender, phoneNumber, email, countryId, stateId, profileStatus };
		this.store.saveData('userId', userId);
		this.store.saveData('userType', userType);
		this.store.saveData('userData', userData);
	}

	sendOTP(userId: number) {
		this.authService.sendOTP({ userId }).then(
			(response: any) => {
				if (response.status === 200) {
					this.showOTP = true;
					this.header = 'Enter One Time Password';
				}
			},
			error => console.log(error)
		);
	}

	otpSubmitted() {
		const userData = this.store.getData('userData');
		userData.profileStatus = 1;
		this.store.saveData('userData', userData);
		this.router.navigate(['/']);
	}
}
