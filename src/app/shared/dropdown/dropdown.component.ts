import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

	@Input() menu: any;
	@Output() menuChange: EventEmitter<any> = new EventEmitter();
	isOpen: boolean;

	constructor() { }

	ngOnInit(): void { }

	onChange(selected: { text: string, value: string }) {
		if (this.menu.selected.text === selected.text) return;
		this.menuChange.emit({ name: this.menu.name, selected });
	}
}
