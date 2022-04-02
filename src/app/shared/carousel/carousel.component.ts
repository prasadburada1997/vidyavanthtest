import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit, OnChanges {

	@ViewChild('wrapper') wrapper: ElementRef;
	@Input() tuitions: any;
	@Input() materials: any;
	@Input() title: string;
	tuitionsToDisplay: any = [];
	materialsToDisplay: any = [];
	hasLeftBtn: boolean = false;
	hasRightBtn: boolean = true;
	currentScroll: number = 0;

	constructor(private store: StoreService, private router: Router) { }

	ngOnInit(): void {
		this.tuitions && this.tuitions.length && (this.tuitionsToDisplay = this.tuitions.slice(0, 8));
		this.materials && this.materials.length && (this.materialsToDisplay = this.materials.slice(0, 9));
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.hasRightBtn = ((this.tuitions && this.tuitions.length) || (this.materials && this.materials.length)) &&
				this.getScrollWidth() > this.getWidth();
		}, 0);
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.tuitions && !changes.tuitions.firstChange) {
			this.tuitions = changes.tuitions.currentValue;
			this.tuitionsToDisplay = this.tuitions.slice(0, 8);
			this.hasRightBtn = true;
		} else if (changes.materials && !changes.materials.firstChange) {
			this.materials = changes.materials.currentValue;
			this.materialsToDisplay = this.materials.slice(0, 9);
			this.hasRightBtn = true;
		}
	}

	getWidth(): number {
		return this.wrapper.nativeElement.offsetWidth;
	}

	getScrollWidth(): number {
		return this.wrapper.nativeElement.scrollWidth;
	}

	getLeft(): number {
		return this.wrapper.nativeElement.scrollLeft;
	}

	handleLeftClick() {
		this.hasRightBtn = true;
		this.currentScroll = this.getLeft() - this.getWidth() * 0.75;
		if (this.currentScroll <= 0) this.currentScroll = 0;
		this.scrollWrapper();
		this.hasLeftBtn = this.getLeft() > 0;
	}

	handleRightClick() {
		this.hasLeftBtn = true;
		this.currentScroll = this.getLeft() + this.getWidth() * 0.75;
		if (this.currentScroll >= (this.getScrollWidth() - this.getWidth()))
			this.currentScroll = this.getScrollWidth() - this.getWidth();
		this.scrollWrapper();
		this.hasRightBtn = this.getLeft() + this.getWidth() < this.getScrollWidth();
	}

	scrollWrapper() {
		this.wrapper.nativeElement.scrollTo({
			left: this.currentScroll,
			behavior: 'smooth'
		});
	}

	viewAllClicked() {
		let data: any = {};
		data.title = this.title;
		if (this.tuitions && this.tuitions.length) {
			data.isTuition = true;
			data.list = this.tuitions;
		} else if (this.materials && this.materials.length) {
			data.isTuition = false;
			data.list = this.materials;
		}
		this.store.saveData('viewAll', data);
		this.router.navigate(['/view-all']);
	}
}
