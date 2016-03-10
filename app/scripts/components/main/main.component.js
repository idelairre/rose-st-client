import { Component, StateConfig } from 'ng-forward';
import { STRIPE } from '../../constants/constants';
import EscListener from '../../directives/esc-listener.directive';
import * as components from '../components.module';
import uiRouter from 'angular-ui-router';

@StateConfig([
	{ name: 'home', url: '/', component: components.HomeComponent, as: 'mainCtrl' },
	{ name: 'posts', url: '/posts', component: components.PostsComponent, as: 'postsCtrl'	},
	{ name: 'posts-detail', url: '/posts/:post', component: components.PostsDetailComponent, as: 'postsDetailCtrl' },
	{ name: 'about', url: '/about',	component: components.AboutComponent, as: 'aboutCtrl'	},
	{ name: 'contact', url: '/contact', component: components.ContactComponent, as: 'contactCtrl'	},
	{ name: 'donate', url: '/donations', component: components.DonationsComponent, as: 'donationsCtrl' }
])

@Component({
	selector: 'rose-st-client',
	controllerAs: 'mainCtrl',
	template: require('./main.html'),
	directives: [components.Nav, components.Header, components.Footer, EscListener],
	providers: [uiRouter]
})

export default class MainComponent { }
