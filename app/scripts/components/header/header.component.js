import { Component, EventEmitter, Inject } from 'ng-forward';
import PostsService from '../posts/posts.service';
import './header.css';

const TITLE = 'Rose St. Community Center';
const SUBHEADING = '100 Blocks Homicide-Free Zone'

@Component({
	selector: 'rose-st-header',
	controllerAs: 'headerCtrl',
	template: require('./header.html')
})

@Inject('$rootScope', '$stateParams')
export default class Header {
	constructor($rootScope, $stateParams, PostsService) {
		this.title = TITLE;
		this.subheading = SUBHEADING;
		$rootScope.$on('post', ::this.setHeader);
		$rootScope.$on('$stateChangeSuccess', (event, toState) => {
			if (toState.name !== 'posts-detail') {
				this.title = TITLE;
				this.subheading = SUBHEADING;
			}
			console.log(this);
		});
	}

	setHeader(event, post) {
		console.log(event, post, post.title, post.subheading);
		this.title = post.title;
		this.subheading = post.subheading;
	}
}
