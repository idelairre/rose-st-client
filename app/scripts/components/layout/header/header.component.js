import { Component, Inject } from 'ng-forward';
import PostsService from '../../posts/posts.service';

@Component({
	selector: 'rose-st-header',
	controllerAs: 'headerCtrl',
	template: require('./header.html'),
	providers: [PostsService]
})

@Inject('$rootScope', PostsService)
export default class Header {
	constructor($rootScope, PostsService) {
		this.PostsService = PostsService;
		this.title = 'Rose St. Community Center';
		this.subheading = '100 Blocks Homocide-Free Zone';
		this.$rootScope = $rootScope;
		this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
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
