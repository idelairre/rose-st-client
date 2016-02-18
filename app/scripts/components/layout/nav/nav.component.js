import { Component, Inject } from 'ng-forward'
import AuthFactory from '../../../services/authentication.service';

@Component({
	selector: 'rose-st-nav',
	controllerAs: 'navCtrl',
	templateUrl: './scripts/components/layout/nav/nav.html',
	providers: [AuthFactory]
})

@Inject(AuthFactory)
export default class NavComponent {
	constructor(AuthFactory) {
		this.AuthFactory = AuthFactory;
	}
}
