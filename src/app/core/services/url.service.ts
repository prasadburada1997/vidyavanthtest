import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UrlService {
	public readonly API_ENDPOINT: string = 'http://ec2-18-219-210-229.us-east-2.compute.amazonaws.com:8080/shramik';

	// public readonly API_ENDPOINT: string = 'http://ec2-15-206-171-29.ap-south-1.compute.amazonaws.com:8080/shramik';

	public readonly ALL_CATEGORIES: string = this.API_ENDPOINT + '/categories/all';
	public readonly COUNTRIES_AND_STATES: string = this.API_ENDPOINT + '/vi-data/countries-states';
	public readonly GET_USER_BY_ID: string = this.API_ENDPOINT + '/user/get-by-id';
	public readonly GET_TUTOR_BY_ID: string = this.API_ENDPOINT + '/user/tutor-profile-by-id';
	public readonly NEW_USER_HOME: string = this.API_ENDPOINT + '/utility/v1/home';
	public readonly SEARCH_NEW_TUITION: string = this.API_ENDPOINT + '/utility/tutions/search';
	public readonly SEARCH_NEW_MATERIAL: string = this.API_ENDPOINT + '/utility/materials/search';
	public readonly STUDENT_HOME: string = this.API_ENDPOINT + '/user/home';
	public readonly CONTACT_US: string = this.API_ENDPOINT + '/utility/contact-us';

	public readonly SIGNUP: string = this.API_ENDPOINT + '/user/signup';
	public readonly LOGIN: string = this.API_ENDPOINT + '/user/signin';
	public readonly SEND_OTP: string = this.API_ENDPOINT + '/user/send-otp';
	public readonly VERIFY_OTP: string = this.API_ENDPOINT + '/user/verify-otp';
	public readonly SEND_OTP_PHONE: string = this.API_ENDPOINT + '/user/ph/send-otp';
	public readonly VERIFY_OTP_PHONE: string = this.API_ENDPOINT + '/user/ph/verify-otp';
	public readonly VERIFY_NUMBER_EMAIL: string = this.API_ENDPOINT + '/user/verify-number-or-mail';
	public readonly CHANGE_PASSWORD: string = this.API_ENDPOINT + '/user/chpwd-op';
	public readonly CHANGE_PASS_WITH_OTP: string = this.API_ENDPOINT + '/user/chpwd-otp';
	public readonly SAVE_FORGOT_PASSWORD: string = this.API_ENDPOINT + '/user/chpwd';
	public readonly UPDATE_PROFILE: string = this.API_ENDPOINT + '/user/update';
	public readonly SAVE_PROFILE: string = this.API_ENDPOINT + '/user/save-profile';

	public readonly TUITION_BY_URL: string = this.API_ENDPOINT + '/utility/tution-by-url';
	public readonly TUITIONS_BY_CATEGORY: string = this.API_ENDPOINT + '/tution/tutions-by-category';
	public readonly MY_TUITIONS: string = this.API_ENDPOINT + '/user/my-tutions';
	public readonly JOIN_TUITION: string = this.API_ENDPOINT + '/user/join-tution';
	public readonly FEEDBACK_TUITION: string = this.API_ENDPOINT + '/user/submit-feedback';
	public readonly REPORT_TUITION: string = this.API_ENDPOINT + '/tution/report-issue';
	public readonly SEARCH_TUITION: string = this.API_ENDPOINT + '/user/tutions/search';
	public readonly LEAVE_TUITION: string = this.API_ENDPOINT + '/user/exit-tution';

	public readonly MATERIAL_BY_URL: string = this.API_ENDPOINT + '/utility/material-by-url';
	public readonly MATERIALS_BY_CATEGORY: string = this.API_ENDPOINT + '/material/materials-by-category';
	public readonly MY_MATERIALS: string = this.API_ENDPOINT + '/material/my-purchased-materials';
	public readonly BUY_MATERIAL: string = this.API_ENDPOINT + '/material/buy-material';
	public readonly FEEDBACK_MATERIAL: string = this.API_ENDPOINT + '/material/save-feedback';
	public readonly REPORT_MATERIAL: string = this.API_ENDPOINT + '/material/report-issue';
	public readonly SEARCH_MATERIAL: string = this.API_ENDPOINT + '/user/materials/search';
	public readonly RATINGS_BY_ID: string = this.API_ENDPOINT + '/material/ratings-by-id';
}
