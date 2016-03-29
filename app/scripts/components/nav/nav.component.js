import { Component } from 'ng-forward';
import './nav.css';

@Component({
	selector: 'rose-st-nav',
	controllerAs: 'navCtrl',
	template: require('./nav.html'),
	provider: ['ui.bootstrap.collapse']
})

export default class NavComponent {
	constructor() {
		this.toggled = false;
	}

	toggle() {
		this.toggled = !this.toggled;
	}
}
