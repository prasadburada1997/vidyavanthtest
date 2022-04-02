import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	isPasswordVisible: boolean = false;
	incorrectData: boolean = false;
	isBtnClicked: boolean = false;

	constructor(
		private authService: AuthenticationService,
		private store: StoreService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	showHidePassword(): void {
		this.isPasswordVisible = !this.isPasswordVisible;
	}

	onSubmit(form: NgForm) {
		this.isBtnClicked = true;
		this.incorrectData = false;
		const { username, password } = form.value;
		this.authService.login({ username, password }).then(
			(response: any) => {
				if (response.status === 200) {
					this.saveUserData(response.result);
					this.router.navigate(['/']).then(() => window.location.reload());
				} else {
					this.incorrectData = true;
				}
				this.isBtnClicked = false;
			},
			error => {
				console.log(error);
				this.isBtnClicked = false;
			}
		);
	}

	saveUserData(data: any) {
		const { userId, userType, firstName, lastName, gender, phoneNumber, email, countryId, stateId, profileStatus, interestedSub, mainClass, subClass } = data;
		const userData = { firstName, lastName, gender, phoneNumber, email, countryId, stateId, profileStatus };
		const academicData = { interestedSubjects: interestedSub, mainClass, subClass };
		this.store.saveData('userId', userId);
		this.store.saveData('userType', userType);
		this.store.saveData('userData', userData);
		this.store.saveData('academicData', academicData);
	}
}
