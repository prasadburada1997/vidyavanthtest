import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-material-card',
	templateUrl: './material-card.component.html',
	styleUrls: ['./material-card.component.scss']
})
export class MaterialCardComponent implements OnInit {

	@Input() cardData: any;
	@Input() longCard: boolean;

	constructor(private store: StoreService) { }

	ngOnInit(): void {
		this.store.saveData('baseUrl', new URL(this.cardData.url).origin);
	}

	isRating(): boolean {
		return this.cardData.averageRating.toLowerCase() !== 'no ratings yet' && this.cardData.noOfRatings > 0;
	}

	getURL(): string {
		return new URL(this.cardData.url).pathname;
	}
}
