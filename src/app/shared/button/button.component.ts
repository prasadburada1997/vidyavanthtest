import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

	@Input() text: string;
	@Input() isAccent: boolean;
	@Input() isIcon: boolean;
	@Input() iconName: boolean;
	@Output() btnClick: EventEmitter<any> = new EventEmitter();

	iconUrl: string

	ngOnInit(): void {
		this.isIcon && (this.iconUrl = `url(assets/${this.iconName}.svg)`);
	}

	handleClick() {
		this.btnClick.emit();
	}
}
