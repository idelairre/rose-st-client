import { Component, Inject } from 'ng-forward';
import AuthFactory from '../../../services/authentication.service';
import PostsService from '../../posts/posts.service';

@Component({
	selector: 'rose-st-header',
	controllerAs: 'headerCtrl',
	template: require('./header.html'),
	providers: [AuthFactory, PostsService]
})

@Inject('$rootScope', AuthFactory, PostsService)
export default class Header {
	constructor($rootScope, AuthFactory, PostsService) {
		this.AuthFactory = AuthFactory;
		this.PostsService = PostsService;
		this.title = 'Rose St. Community Center';
		this.subheading = '100 Blocks Homocide-Free Zone';
		this.$rootScope = $rootScope;
		this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
			console.log(toState.name);
			if (toState.name === 'posts-detail') {
				this.title = this.PostsService.post.title;
				this.subheading = this.PostsService.post.subheading;
			} else {
				this.title = 'Rose St. Community Center';
				this.subheading = '100 Blocks Homocide-Free Zone';
			}
		});
	}
}
