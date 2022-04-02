import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
	providedIn: 'root'
})
export class CommonService {

	constructor(private http: HttpClient, private urlService: UrlService) { }

	getAllCategories() {
		return new Promise((resolve, reject) => {
			this.http.get(this.urlService.ALL_CATEGORIES)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getCountriesAndStates() {
		return new Promise((resolve, reject) => {
			this.http.get(this.urlService.COUNTRIES_AND_STATES)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getUserById(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.GET_USER_BY_ID, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getTutorById(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.GET_TUTOR_BY_ID, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getNewUserHomepage(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.NEW_USER_HOME, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	searchTuitionForNewUser(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SEARCH_NEW_TUITION, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	searchMaterialForNewUser(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SEARCH_NEW_MATERIAL, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getStudentHomepage(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.STUDENT_HOME, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	contactUs(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.CONTACT_US, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}
}
