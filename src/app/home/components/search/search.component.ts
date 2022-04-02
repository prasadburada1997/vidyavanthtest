import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	@Input() miniSearch: boolean;
	@Input() homeSearch: boolean;
	@ViewChild('inputRef') inputRef: ElementRef;
	@ViewChild('miniInputRef') miniInputRef: ElementRef;
	isSearchOpen: boolean = false;
	isMiniSearchOpen: boolean = false;
	noResults: boolean = false;
	searchText: string = '';
	searchType: string = 'tuition';
	miniSearchType: string = 'tuition';
	searchResults: string[] = [];
	timeoutId: any;

	constructor(
		private store: StoreService,
		private commonService: CommonService,
		private router: Router
	) { }

	ngOnInit(): void { }

	openMiniSearch() {
		this.isMiniSearchOpen = true;
		this.miniInputRef.nativeElement.focus();
	}

	closeMiniSearch() {
		this.isMiniSearchOpen = false;
		this.clearSearchAndResults();
	}

	clearSearchAndResults() {
		this.searchText = '';
		this.searchResults = [];
		this.noResults = false;
		this.isSearchOpen = false;
	}

	debounce(func: Function, delay: number) {
		clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(() => {
			func.apply(this, arguments)
		}, delay);
	}

	search(event: KeyboardEvent) {
		this.noResults = false;
		const keyword = this.searchText;
		const userId = this.store.getData('userId') || 1;
		const searchKeyword = () => {
			if (this.searchText === '') this.searchResults = [];
			else {
				this.isSearchOpen = true;
				if (this.isTuitionType()) {
					this.commonService.searchTuitionForNewUser({ userId, keyword }).then(
						(response: any) => {
							if (response.status === 200) {
								this.searchResults = response.result;
								this.noResults = this.searchResults.length === 0;
							}
						},
						error => {
							console.log(error);
						}
					);
				} else {
					this.commonService.searchMaterialForNewUser({ userId, keyword }).then(
						(response: any) => {
							if (response.status === 200) {
								this.searchResults = response.result;
								this.noResults = this.searchResults.length === 0;
							}
						},
						error => {
							console.log(error);
						}
					);
				}
			}
		};
		this.searchText = (event.target as HTMLInputElement).value;
		this.debounce(searchKeyword, 1000);
	}

	closeOverlay() {
		this.clearSearchAndResults();
	}

	handleTypeChange() {
		this.clearSearchAndResults();
		this.miniSearch ? this.miniInputRef.nativeElement.focus() : this.inputRef.nativeElement.focus();
	}

	goToURL(url: string) {
		this.router.navigate([new URL(url).pathname]);
		this.isMiniSearchOpen = false;
		this.clearSearchAndResults();
	}

	isTuitionType(): boolean {
		return this.miniSearch ? this.miniSearchType === 'tuition' : this.searchType === 'tuition';
	}
}
