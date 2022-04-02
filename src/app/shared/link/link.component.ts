import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss']
})

export class LinkComponent implements OnInit, OnChanges {

	@Input() url: string;
	@Input() text: string;

	ngOnInit(): void { }

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes.url.firstChange) {
			this.url = changes.url.currentValue;
		}
	}
}
