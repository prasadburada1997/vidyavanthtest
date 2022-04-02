import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(private store: StoreService, private router: Router) { }

	isLogin: boolean = false;
	isSidebarOpen: boolean = false;
	isOpenMenu: boolean = false;
	initials: string;
	fullname: string;
	emailId: string;

	ngOnInit(): void {
		if (this.store.getData('userId')) {
			const userData = this.store.getData('userData');
			this.fullname = userData.firstName + ' ' + userData.lastName;
			this.initials = this.fullname.match(/\b\w/g).join('');
			this.emailId = userData.email;
			this.isLogin = true;
		}
	}

	openSidebar() {
		this.isSidebarOpen = true;
	}

	closeSidebar() {
		this.isSidebarOpen = false;
	}

	notificationClick() {
		// notification logic
	}

	logout() {
		this.store.clearData();
		this.isLogin = false;
		this.isSidebarOpen = false;
		this.router.navigate(['/']).then(() => window.location.reload());
	}
}
