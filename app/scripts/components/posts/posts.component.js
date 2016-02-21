import { Component, Inject, Resolve } from 'ng-forward';
import PostsService from './posts.service';
import 'angular-utils-pagination';

@Component({
  selector: 'posts',
  controllerAs: 'postsCtrl',
  template: require('./posts.html'),
  providers: ['ui.bootstrap.pagination', PostsService]
})

@Inject('$scope', PostsService)
export default class PostsComponent {
  @Resolve()
  @Inject(PostsService)
  static resolve(PostsService) {
    return PostsService.query();
  }

  constructor($scope, PostsService) {
    this.PostsService = PostsService;
    this.posts = PostsService.posts;
    this.itemsPerPage = 3;
    this.totalItems = this.posts.length;
    this.currentPage = 1;
  }

  setPage(pageNo) {
    this.currentPage = pageNo;
  }
}
