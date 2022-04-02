import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

	phoneNumber: number;
	incorrectPassword: boolean;
	isOTP: boolean = false;
	step: number = 1;
	success: boolean = false;
	phoneError: boolean;
	isBtnClicked: boolean = false;

	constructor(private authService: AuthenticationService, private store: StoreService) { }

	ngOnInit(): void {
	}

	showHideOTP() {
		this.isOTP = !this.isOTP;
		this.resetStatus();
	}

	resetStatus() {
		this.step = 1;
		this.success = false
		this.isBtnClicked = false;
	}

	onChangePassword(form: NgForm, isWithOtp: boolean) {
		this.isBtnClicked = true;
		this.incorrectPassword = false;
		const userId = this.store.getData('userId');
		if (isWithOtp) {
			const { newPassword } = form.value;
			this.authService.changePasswordWithOTP({ userId, newPassword }).then(
				(response: any) => {
					if (response.status === 200) {
						this.success = true;
						form.resetForm();
					}
					this.isBtnClicked = false;
				},
				error => {
					console.log(error);
					this.isBtnClicked = false;
				}
			);
		} else {
			const { oldPassword, newPassword } = form.value;
			this.authService.changePassword({ userId, oldPassword, newPassword }).then(
				(response: any) => {
					if (response.status === 200) {
						this.success = true;
						form.resetForm();
					} else if (response.status === 400) {
						this.incorrectPassword = true;
					}
					this.isBtnClicked = false;
				},
				error => {
					console.log(error);
					this.isBtnClicked = false;
				}
			);
		}
	}

	onPhoneSubmit(form: NgForm) {
		const { phoneNumber } = form.value;
		if (+this.store.getData('userData').phoneNumber !== phoneNumber) {
			this.phoneError = true;
			return;
		}
		this.isBtnClicked = true;
		this.authService.sendOTPToPhone({ phoneNumber }).then(
			(response: any) => {
				if (response.status === 200) {
					this.phoneNumber = phoneNumber;
					this.step = 2;
				} else if (response.status === 400) {
					this.phoneError = true;
				}
				this.isBtnClicked = false;
			},
			error => {
				console.log(error);
				this.isBtnClicked = false;
			}
		);
	}

	otpSubmitted() {
		this.step = 3;
	}
}
