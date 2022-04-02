import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	isLogin: boolean;

	constructor(private store: StoreService, private router: Router) { }

	ngOnInit(): void {
		this.isLogin = this.store.getData('userId');
	}
}
