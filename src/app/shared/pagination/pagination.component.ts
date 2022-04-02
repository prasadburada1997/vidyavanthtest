import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

	@Input() pages: number;
	@Output() pageChange: EventEmitter<any> = new EventEmitter();
	currentPage: number = 0;

	constructor() { }

	ngOnInit(): void { }

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes.pages.firstChange) {
			this.currentPage = 0;
		}
	}

	pageClicked(pageNumber: number) {
		this.currentPage = pageNumber;
		this.pageChange.emit(this.currentPage);
	}

	leftBtnClicked() {
		this.currentPage > 0 && this.pageClicked(this.currentPage - 1);
	}

	rightBtnClicked() {
		this.currentPage < this.pages - 1 && this.pageClicked(this.currentPage + 1);
	}
}
