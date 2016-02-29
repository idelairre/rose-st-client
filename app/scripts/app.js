import angular from 'angular';
import { bootstrap, Component, StateConfig } from 'ng-forward';
import { STRIPE } from './constants/constants';
import RouteConfig from './config/routes.config';
import StateReload from './config/state-reload.config';
import SceWhitelist from './config/sce-whitelist.config';
import uiRouter from 'angular-ui-router';
import EscListener from './directives/esc-listener.directive';
import * as components from './components/components.module';
import 'angular-animate';
import 'angular-messages';
import 'angular-ui-bootstrap';
import 'angular-input-masks';
import 'babel-polyfill';
import 'ng-currency-mask';
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

export default class RoseStClient { }

bootstrap(RoseStClient, ['ngAnimate', 'ngMessages', 'ui.bootstrap', 'ui.router', 'ui.utils.masks', RouteConfig.name, SceWhitelist.name]);
