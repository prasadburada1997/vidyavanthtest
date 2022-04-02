import { Component } from '@angular/core';

@Component({
	selector: 'app-loader',
	template: `<div class="loader"></div>`,
	styles: [`
		.loader {
			height: calc(100vh - 5rem);
			overflow: hidden;
			z-index: 5;
			position: relative;
		}

		.loader::before {
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
		}

		.loader::after {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			transform: translate(-50%, -50%);
			border: 0.5rem solid #eb8a2f;
			border-top-color: transparent;
			animation: rotate 0.5s infinite linear;
		}
	`]
})
export class LoaderComponent { }
