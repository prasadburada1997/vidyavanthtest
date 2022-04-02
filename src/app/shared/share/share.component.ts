import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
	selector: 'app-share',
	templateUrl: './share.component.html',
	styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

	@Input() url: string;
	@Input() title: string;
	@Input() isTuition: boolean;
	@Output() closePopup: EventEmitter<any> = new EventEmitter();
	@ViewChild("text") text: ElementRef;
	hasShareFeature: boolean;
	btnText: string = 'Copy';

	constructor() { }

	ngOnInit(): void {
		this.hasShareFeature = Boolean(navigator.share);
	}

	copyToClipboard() {
		this.text.nativeElement.select();
		document.execCommand("copy");
		window.getSelection().removeAllRanges();
		this.btnText = 'Copied!';
	}

	shareWithApps() {
		const text = "Thought you might enjoy this tuition on Vidyavanth";
		navigator.share({ title: this.title, text, url: this.url })
			.then(() => console.log('Successful share!'))
			.catch(err => console.log(err));
	}

	close() {
		this.closePopup.emit();
	}

}
