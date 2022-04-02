import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';
import { TuitionService } from 'src/app/core/services/tuition.service';

const COLORS = ['#000', '#3c3b37', '#0F3E68'];

@Component({
	selector: 'app-tuition',
	templateUrl: './tuition.component.html',
	styleUrls: ['./tuition.component.scss']
})
export class TuitionComponent implements OnInit {

	id: string;
	data: any = {};
	isLoading: boolean = true;
	bannerColor: string;
	status: string;
	joinBtnText: string = 'Join Now';
	btnDisabled: boolean = false;
	startDate: Date;
	endTime: Date;
	countDownTimer: any;
	isPurchased: boolean = false;
	hasLeftFromTuition: boolean = false;
	btnLoading: boolean = false;
	weekOffs: { name: string, disabled: boolean }[];
	joinPopup: boolean = false;
	leavePopup: boolean = false;
	sharePopup: boolean = false;
	reportPopup: boolean = false;
	ratingPopup: boolean = false;

	constructor(
		private router: Router,
		private activatedRouter: ActivatedRoute,
		private store: StoreService,
		private tuitionService: TuitionService
	) { }

	ngOnInit(): void {
		this.id = this.activatedRouter.snapshot.params.id;
		this.getDataFromId(this.id);
	}

	getDataFromId(id: string) {
		const userId = this.store.getData('userId') || 1;
		const myTuitions = this.store.getData('my-tuitions');
		const myTuitionData = this.getDataFromMyTuition(id, myTuitions);
		if (myTuitionData) {
			this.data = myTuitionData;
			this.initialize();
			this.isLoading = false;
		} else {
			const url = (this.store.getData('baseUrl') || window.location.origin) + '/tuition/' + id;
			this.tuitionService.getTuitionByURL({ userId, url }).then(
				(response: any) => {
					if (response.status === 200) {
						this.data = response.result[0];
						this.initialize();
						this.isLoading = false;
					} else {
						console.log('ERROR while getting tuition');
						this.router.navigate(['404']);
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	}

	getDataFromMyTuition(id: string, myTuitions: any) {
		return myTuitions && myTuitions.find(item => new URL(item.url).pathname === '/tuition/' + id);
	}

	initialize() {
		this.setStartDate();
		this.setColor();
		this.setCountdownTimer();
		this.setWeekOffs();
		this.isPurchased = this.data.joinFlag || Boolean(this.data.joinedOn);
		this.hasLeftFromTuition = this.data.status && this.data.status.includes('left');
		this.status = this.data.status || 'Not started yet';
	}

	setColor() {
		this.bannerColor = COLORS[Math.floor(Math.random() * COLORS.length)];
	}

	setStartDate() {
		const [tempStartTime, tempEndTime] = this.data.timings.split('-');
		this.startDate = this.getDateFromString(this.data.fromDate);
		this.endTime = new Date(this.startDate.getTime());
		this.startDate.setHours(tempStartTime.split(':')[0]);
		this.startDate.setMinutes(tempStartTime.split(':')[1]);
		this.endTime.setHours(tempEndTime.split(':')[0]);
		this.endTime.setMinutes(tempEndTime.split(':')[1]);
	}

	setCountdownTimer() {
		const calculateTimer = () => {
			const today = new Date();
			const total = +this.startDate - +today;
			const seconds = Math.floor((total / 1000) % 60);
			const minutes = Math.floor((total / (1000 * 60)) % 60);
			const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
			const days = Math.floor(total / (1000 * 60 * 60 * 24));
			this.countDownTimer = { total: total, days: days, hours: hours, minutes: minutes, seconds: seconds };

			if (total <= 0) {
				clearInterval(timer);
				this.joinBtnText = 'Started today';
				if (days < 0) {
					this.joinBtnText = 'Started';
					this.btnDisabled = true;
				}
			}
		}
		const timer = setInterval(calculateTimer, 1000);
	}

	setWeekOffs() {
		this.weekOffs = [{ name: 'sun', disabled: false }, { name: 'mon', disabled: false }, { name: 'tue', disabled: false }, { name: 'wed', disabled: false }, { name: 'thu', disabled: false }, { name: 'fri', disabled: false }, { name: 'sat', disabled: false }];
		let dayOff = this.data.weekoff;
		if (!dayOff) return;
		else dayOff = dayOff.split(',');
		dayOff.forEach((item: string) => {
			this.weekOffs.map(day => day.name === item.toLowerCase() && (day.disabled = true));
		});
	}

	getDateFromString(dateString: string): Date {
		return new Date(dateString.split('-').reverse().join('/'));
	}

	isRating(): boolean {
		return this.data.ratingsCount > 0 && this.data.averageRating.toLowerCase() !== 'no ratings yet';
	}

	isBtnDisabled(): boolean {
		return (this.data.maxNoOfStudents - this.data.noOfStudentsJoined) <= 0 || (+this.startDate - +new Date()) <= 0 || this.btnDisabled || this.btnLoading;
	}

	isCancelBtn(): boolean {
		return this.isPurchased && this.status.toLowerCase().includes('not');
	}

	getRatingStatus(): boolean {
		return +new Date() > +this.getDateFromString(this.data.toDate);
	}

	openConfirmPopup(isJoinBtn: boolean) {
		if (this.store.getData('userId')) {
			if (isJoinBtn) {
				this.joinPopup = true;
			} else {
				this.leavePopup = true;
			}
		} else {
			this.router.navigate(['/login']);
		}
	}

	handleShareClick() {
		this.sharePopup = true;
	}

	closePopup() {
		this.joinPopup = false;
		this.leavePopup = false;
		this.sharePopup = false;
		this.reportPopup = false;
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

	joinTuition() {
		this.closePopup();
		const userId = this.store.getData('userId');
		if (userId) {
			const { tutionId } = this.data;
			const paidAmount = +this.data.price;
			this.isLoading = true;
			this.tuitionService.joinTuition({ userId, tutionId, paidAmount }).then(
				(response: any) => {
					if (response.status === 200) {
						this.isPurchased = true;
						this.isLoading = false;
					}
				},
				error => {
					console.log(error);
				}
			);
		} else {
			this.router.navigate(['/login']);
		}
	}

	leaveTuition() {
		this.closePopup();
		const userId = this.store.getData('userId');
		const tutionId = this.data.tutionId;
		this.tuitionService.leaveTuition({ userId, tutionId }).then(
			(response: any) => {
				if (response.status === 200) {
					this.hasLeftFromTuition = true;
					console.log('tuition left');
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	reportTuition(issueDesc: string) {
		const reporteeId = this.store.getData('userId');
		const { tutionId } = this.data;
		this.tuitionService.reportTuition({ tutionId, reporteeId, issueDesc }).then(
			(response: any) => {
				if (response.status === 200) {
					console.log('tuition reported');
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	feedbackTuition({ rating, comment }) {
		const userId = this.store.getData('userId');
		const { tutionId } = this.data;
		this.tuitionService.sendTuitionFeedback({ userId, tutionId, rating, comment }).then(
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
}
