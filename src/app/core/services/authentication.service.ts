import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private http: HttpClient, private urlService: UrlService) { }

	signup(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SIGNUP, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	login(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.LOGIN, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	sendOTP(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SEND_OTP, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	verifyOTP(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.VERIFY_OTP, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	sendOTPToPhone(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SEND_OTP_PHONE, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	verifyOTPSentToPhone(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.VERIFY_OTP_PHONE, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	verifyNumberOrEmail(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.VERIFY_NUMBER_EMAIL, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	changePassword(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.CHANGE_PASSWORD, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	changePasswordWithOTP(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.CHANGE_PASS_WITH_OTP, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	saveForgotPassword(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SAVE_FORGOT_PASSWORD, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	updateProfile(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.UPDATE_PROFILE, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	saveProfile(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SAVE_PROFILE, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}
}
