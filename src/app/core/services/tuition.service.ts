import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
	providedIn: 'root'
})
export class TuitionService {

	constructor(private http: HttpClient, private urlService: UrlService) { }

	getTuitionByURL(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.TUITION_BY_URL, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getTuitionsByCategory(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.TUITIONS_BY_CATEGORY, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getMyTuitions(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.MY_TUITIONS, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	joinTuition(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.JOIN_TUITION, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	sendTuitionFeedback(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.FEEDBACK_TUITION, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	reportTuition(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.REPORT_TUITION, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	searchTuition(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SEARCH_TUITION, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	leaveTuition(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.LEAVE_TUITION, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}
}
