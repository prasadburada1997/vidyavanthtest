import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

	isBtnClicked: boolean = false;
	header = 'Forgot Password';
	phoneError: boolean = false;
	forgotPassPhone: number;
	success: boolean;
	step: number = 1;

	constructor(
		private authService: AuthenticationService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	onPhoneSubmit(form: NgForm) {
		this.isBtnClicked = true;
		this.phoneError = false;
		const { phoneNumber } = form.value;
		this.forgotPassPhone = phoneNumber;
		this.authService.sendOTPToPhone({ phoneNumber }).then(
			(response: any) => {
				if (response.status === 200) {
					this.step = 2;
					this.header = 'Enter One Time Password';
				} else if (response.status === 400 && response.message.toLowerCase().includes('phone number')) {
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

	onSavePassword(form: NgForm) {
		this.isBtnClicked = true;
		const { newPassword } = form.value;
		const phoneNumber = this.forgotPassPhone;
		this.authService.saveForgotPassword({ phoneNumber, newPassword }).then(
			(response: any) => {
				if (response.status === 200) {
					this.success = true;
					this.router.navigate(['/login']);
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
