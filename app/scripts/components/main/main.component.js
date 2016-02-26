import { Component } from 'ng-forward';
import 'angular-ui-bootstrap';

@Component({
	selector: 'main',
	controllerAs: 'mainCtrl',
	template: require('./main.html'),
	provider: ['ui.bootstrap.collapse']
})

export default class MainComponent {}
