import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
	providedIn: 'root'
})
export class MaterialService {

	constructor(private http: HttpClient, private urlService: UrlService) { }

	getMaterialByURL(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.MATERIAL_BY_URL, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getMaterialsByCategory(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.MATERIALS_BY_CATEGORY, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getMyMaterials(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.MY_MATERIALS, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	buyMaterial(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.BUY_MATERIAL, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	sendMaterialFeedback(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.FEEDBACK_MATERIAL, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	reportMaterial(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.REPORT_MATERIAL, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	searchMaterial(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.SEARCH_MATERIAL, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}

	getRatings(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(this.urlService.RATINGS_BY_ID, data)
				.toPromise()
				.then(
					response => resolve(response),
					error => reject(error)
				);
		});
	}
}
