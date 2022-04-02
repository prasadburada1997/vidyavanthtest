import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

	@Output() issueSubmit: EventEmitter<any> = new EventEmitter();
	@Output() closePopup: EventEmitter<any> = new EventEmitter();
	reportSent: boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

	onSubmit(report: NgForm) {
		const { issue } = report.value;
		this.issueSubmit.emit(issue);
		this.reportSent = true;
	}

	close() {
		this.closePopup.emit();
	}
}
