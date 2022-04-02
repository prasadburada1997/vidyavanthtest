import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input() isSidebarOpen: boolean;
	@Output() closeSidebar: EventEmitter<any> = new EventEmitter();
	isLogin: boolean = false;
	fullname: string;
	initials: string;

	constructor(private router: Router, private store: StoreService) { }

	ngOnInit(): void {
		if (this.store.getData('userId')) {
			this.isLogin = true;
			const userData = this.store.getData('userData');
			this.fullname = userData.firstName + ' ' + userData.lastName;
			this.initials = this.fullname.match(/\b\w/g).join('');
		}
	}

	handleCloseSidebar() {
		this.closeSidebar.emit();
	}

	navigateLink(path: string) {
		this.handleCloseSidebar();
		this.router.navigate([path]);
	}

	notificationClick() {
		// notification logic
	}

	logout() {
		this.store.clearData();
		this.isLogin = false;
		this.handleCloseSidebar();
		this.router.navigate(['/']).then(() => window.location.reload());
	}
}
