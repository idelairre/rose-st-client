import angular from 'angular';
import { bootstrap, Component, Inject, StateConfig } from 'ng-forward';
import { STRIPE } from './constants/constants';
import RouteConfig from './config/routes.config';
import SceWhitelist from './config/sce-whitelist.config';
import StripeLogger from './config/stripe-logger.run';
import uiRouter from 'angular-ui-router';
import EscListener from './directives/esc-listener.directive';
import * as components from './components/components.module';
import 'babel-polyfill';
import 'reflect-metadata';

@StateConfig([{
		name: 'main',
		url: '/',
		component: components.MainComponent,
		as: 'mainCtrl'
	}, {
		name: 'posts',
	  url: '/posts',
		component: components.PostsComponent,
		as: 'postsCtrl'
	}, {
	  name: 'posts-detail',
	  url: '/posts/:post',
		component: components.PostsDetailComponent,
		as: 'postsDetailCtrl'
	}, {
	  name: 'about',
	  url: '/about',
		component: components.AboutComponent,
		as: 'aboutCtrl'
	}, {
	  name: 'contact',
	  url: '/contact',
		component: components.ContactComponent,
		as: 'contactCtrl'
	}, {
		name: 'donate',
		url: '/donations',
		component: components.DonationsComponent,
		as: 'donationsCtrl'
	}, {
	  name: 'login',
	  url: '/login',
		component: components.LoginComponent,
		as: 'loginCtrl'
}])

@Component({
	selector: 'rose-st-client',
	controllerAs: 'roseStClient',
	providers: [uiRouter],
	directives: [components.Nav, components.Header, components.Footer, EscListener],
	template: `
		<rose-st-nav></rose-st-nav>
		<rose-st-header esc-listener></rose-st-header>
		<ui-view></ui-view>
		<rose-st-footer></rose-st-footer>
	`
})

export default class RoseStClient {}

bootstrap(RoseStClient, ['ui.router', RouteConfig.name, SceWhitelist.name, StripeLogger.name]);
