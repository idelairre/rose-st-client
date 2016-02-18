import { Component, Inject } from 'ng-forward';
import AuthFactory from '../../../services/authentication.service';

@Component({
	selector: 'rose-st-header',
	controllerAs: 'headerCtrl',
	templateUrl: './scripts/components/layout/header/header.html',
	providers: [AuthFactory]
})

@Inject(AuthFactory)
export default class Header {
	constructor(AuthFactory) {
		this.AuthFactory = AuthFactory;
	}
}
