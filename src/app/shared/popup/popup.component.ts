import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

	@Input() isTuition: boolean;
	@Input() isCancel: boolean;
	@Output() onConfirm: EventEmitter<any> = new EventEmitter();
	@Output() closePopup: EventEmitter<any> = new EventEmitter();
	title: string;
	description: string;
	btnText: string;

	constructor() { }

	ngOnInit(): void {
		if (this.isTuition) {
			this.title = 'Join Tuition';
			this.description = 'Are you sure you want to join this tuition?';
			this.btnText = 'Join';
		} else if (this.isCancel) {
			this.title = 'Leave Tuition';
			this.description = 'Are you sure you want to leave this tuition?';
			this.btnText = 'Leave';
		} else {
			this.title = 'Buy Material';
			this.description = 'Are you sure you want to buy this material?';
			this.btnText = 'Buy';
		}
	}

	confirmClicked() {
		this.onConfirm.emit();
	}

	close() {
		this.closePopup.emit();
	}
}
