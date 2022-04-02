import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/core/services/material.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-material',
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

	id: string;
	data: any;
	isLoading: boolean = true;
	isPurchased: boolean = false;
	btnLoading: boolean = false;
	userReviews = [];
	buyPopup: boolean = false;
	sharePopup: boolean = false;
	reportPopup: boolean = false;
	ratingPopup: boolean = false;

	constructor(
		private activatedRouter: ActivatedRoute,
		private router: Router,
		private store: StoreService,
		private materialService: MaterialService
	) { }

	ngOnInit(): void {
		this.id = this.activatedRouter.snapshot.params.id;
		this.getDataFromId(this.id);
	}

	getDataFromId(id: string) {
		const userId = this.store.getData('userId') || 1;
		const url = (this.store.getData('baseUrl') || window.location.origin) + '/material/' + id;
		this.materialService.getMaterialByURL({ userId, url }).then(
			(response: any) => {
				if (response.status === 200) {
					this.data = response.result[0];
					this.isPurchased = this.data.purchaseFlag;
					this.getRatingsFromId(this.data.materialId);
					this.isLoading = false;
				} else {
					console.log('ERROR while loading material');
					this.router.navigate(['404']);
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getRatingsFromId(materialId: number) {
		this.materialService.getRatings({ materialId }).then(
			(response: any) => {
				if (response.status === 200) {
					this.userReviews = response.result;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	isRating(): boolean {
		return this.data.noOfRatings > 0 && this.data.averageRating.toLowerCase() !== 'no ratings yet';
	}

	getInitials(name: string): string {
		return name.match(/\b\w/g).join('');
	}

	downloadMaterial() {
		this.closePopup();
		if (this.data.type === "FREE" || this.isPurchased) {
			const link = document.createElement('a');
			link.href = this.data.location;
			link.target = '_blank';
			link.download = this.data.materialName + '.pdf';
			link.dispatchEvent(new MouseEvent('click'));
		} else {
			const userId = this.store.getData('userId');
			const { materialId } = this.data;
			const paidAmount = +this.data.price;
			this.btnLoading = true;
			this.materialService.buyMaterial({ userId, materialId, paidAmount }).then(
				(response: any) => {
					if (response.status === 200) {
						this.isPurchased = true;
						this.btnLoading = false;
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	}

	reportMaterial(issueDesc: string) {
		const reporteeId = this.store.getData('userId');
		const { materialId } = this.data;
		this.materialService.reportMaterial({ materialId, reporteeId, issueDesc }).then(
			(response: any) => {
				if (response.status === 200) {
					console.log('material reported');
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	feedbackMaterial({ rating, comment }) {
		const userId = this.store.getData('userId');
		const { materialId } = this.data;
		this.materialService.sendMaterialFeedback({ userId, materialId, rating, comment }).then(
			(response: any) => {
				if (response.status === 200) {
					console.log('feedback sent');
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	openConfirmPopup() {
		if (this.store.getData('userId')) {
			if (this.data.type === "FREE" || this.isPurchased) {
				this.downloadMaterial();
			} else {
				this.buyPopup = true;
			}
		} else {
			this.router.navigate(['/login']);
		}
	}

	handleShareClick() {
		this.sharePopup = true;
	}

	closePopup() {
		this.sharePopup = false;
		this.reportPopup = false;
		this.buyPopup = false;
		this.ratingPopup = false;
	}

	handleReportClick() {
		if (this.store.getData('userId')) {
			this.reportPopup = true;
		} else {
			this.router.navigate(['/login']);
		}
	}

	openRatingPopup() {
		this.ratingPopup = true;
	}
}
