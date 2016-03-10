import { Component, Inject, Resolve } from 'ng-forward';
import PostsService from './posts.service';
import 'angular-utils-pagination';
import 'angular-resource';

@Component({
  selector: 'posts',
  controllerAs: 'postsCtrl',
  template: require('./posts.html'),
  providers: ['ui.bootstrap.pagination', PostsService]
})

@Inject(PostsService)
export default class PostsComponent {
  constructor(PostsService) {
    this.posts = PostsService.query();
    this.itemsPerPage = 3;
    this.totalItems = this.posts.length;
    this.currentPage = 1;
  }

  setPage(pageNo) {
    this.currentPage = pageNo;
  }
}
