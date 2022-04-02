import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-otp',
	templateUrl: './otp.component.html',
	styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

	@Input() phoneNumber: number;
	@Output() otpSubmitted: EventEmitter<any> = new EventEmitter();
	isValidOTP: boolean = true;
	isBtnClicked: boolean = false;

	constructor(private authService: AuthenticationService, private store: StoreService) { }

	ngOnInit(): void { }

	onSubmit(form: NgForm) {
		this.isBtnClicked = true;
		this.isValidOTP = true;
		const { otp } = form.value;
		if (this.phoneNumber) {
			const phoneNumber = this.phoneNumber;
			this.authService.verifyOTPSentToPhone({ phoneNumber, otp }).then(
				(response: any) => {
					if (response.status === 200) {
						this.otpSubmitted.emit();
					} else {
						this.isValidOTP = false;
						this.isBtnClicked = false;
					}
				},
				error => {
					console.log(error);
					this.isBtnClicked = false;
				}
			);
		} else {
			const userId = this.store.getData('userId');
			this.authService.verifyOTP({ userId, otp }).then(
				(response: any) => {
					if (response.status === 200) {
						this.otpSubmitted.emit();
					} else {
						this.isValidOTP = false;
						this.isBtnClicked = false;
					}
				},
				error => {
					console.log(error);
					this.isBtnClicked = false;
				}
			);
		}
	}
}