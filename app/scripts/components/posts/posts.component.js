import { Component, Inject } from 'ng-forward';
import PostsService from './posts.service';
import 'angular-utils-pagination';

@Component({
  selector: 'posts',
  controllerAs: 'postsCtrl',
  templateUrl: './scripts/components/posts/posts.html',
  providers: ['angularUtils.directives.dirPagination', PostsService]
})

@Inject(PostsService)
export default class PostsComponent {
  constructor(PostsService) {
    this.PostsService = PostsService;
    this.posts = PostsService.posts;
  }

  // open() {
  //   this.$uibModalInstance = this.$uibModal.open({
  //     templateUrl: './app/scripts/components/posts/posts.form/posts.form.html',
  //     size: 'lg'
  //   });
  // }
}
