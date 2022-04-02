import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

	@Input() isTuition: boolean;
	@Output() onSubmitRating: EventEmitter<any> = new EventEmitter();
	@Output() closePopup: EventEmitter<any> = new EventEmitter();
	star: { value: number, text: string };
	tempData: { value: number, text: string, isClicked: boolean };
	startData: { value: number, text: string }[] = [
		{ value: 0, text: 'Select rating' },
		{ value: 20, text: 'Awful, not what I expected at all' },
		{ value: 30, text: 'Awful / Poor' },
		{ value: 40, text: 'Poor, pretty disappointed' },
		{ value: 50, text: 'Poor / Average' },
		{ value: 60, text: 'Average, could be better' },
		{ value: 70, text: 'Average / Good' },
		{ value: 80, text: 'Good, what I expected' },
		{ value: 90, text: 'Good / Amazing' },
		{ value: 100, text: 'Amazing, above expectations!' }
	];

	constructor() { }

	ngOnInit(): void {
		this.star = this.startData[0];
		this.tempData = { value: this.star.value, text: this.star.text, isClicked: false };
	}

	handleMouseOver(event: MouseEvent) {
		const width = (event.currentTarget as HTMLElement).clientWidth;
		const value = event.offsetX;
		this.star = this.startData.find(item => (value * 100 / width) < item.value)
	}

	handleMouseOut(event: MouseEvent) {
		if (this.tempData.isClicked) {
			this.star = { text: this.tempData.text, value: this.tempData.value };
		} else {
			this.star = this.startData[0];
		}
	}

	handleClick(event: MouseEvent) {
		this.tempData.isClicked = true;
		this.tempData.text = this.star.text;
		this.tempData.value = this.star.value;
	}

	onSubmit(form: NgForm) {
		const rating = this.tempData.value / 20;
		const comment = form.value.feedback;
		this.onSubmitRating.emit({ rating, comment });
		this.close();
	}

	close() {
		this.closePopup.emit();
	}
}