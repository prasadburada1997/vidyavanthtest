import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

	isLoading: boolean = true;
	isLogin: boolean;
	isBtnClicked: boolean;
	success: boolean;

	constructor(private store: StoreService, private commonService: CommonService) { }

	ngOnInit(): void {
		this.isLogin = Boolean(this.store.getData('userId'));
	}

	onContactSubmit(form: NgForm) {
		this.isBtnClicked = true;
		const { type, message } = form.value;
		const userId = this.store.getData('userId') || 1;
		this.commonService.contactUs({ userId, type, message }).then(
			(response: any) => {
				if (response.status === 200) {
					form.reset({ type: '' });
					this.isBtnClicked = false;
					this.success = true;
				}
			},
			error => {
				console.log(error);
				this.isBtnClicked = false;
			}
		);
	}
}
