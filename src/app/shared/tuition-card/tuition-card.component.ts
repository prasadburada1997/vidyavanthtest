import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-tuition-card',
	templateUrl: './tuition-card.component.html',
	styleUrls: ['./tuition-card.component.scss']
})
export class TuitionCardComponent implements OnInit {

	@Input() cardData: any;
	@Input() enrolled: boolean;
	@Input() longCard: boolean;

	constructor(private store: StoreService) { }

	ngOnInit(): void {
		this.store.saveData('baseUrl', new URL(this.cardData.url).origin);
	}

	isRating(): boolean {
		return this.cardData.averageRating.toLowerCase() !== 'no ratings yet' && this.cardData.ratingsCount > 0;
	}

	getURL(): string {
		return new URL(this.cardData.url).pathname;
	}

	getStatus(): string {
		return this.cardData.status || 'Not started yet';
	}

	getDateFromString(dateString: string): Date {
		return dateString === '' ? new Date() : new Date(dateString.split('-').reverse().join('/'));
	}
}
