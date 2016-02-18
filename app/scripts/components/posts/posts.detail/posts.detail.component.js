import { Component, Resolve, Inject } from 'ng-forward';
import PostsService from '../posts.service';
import 'angular-utils-disqus';

@Component({
  selector: 'posts-detail',
  controllerAs: 'postsDetailCtrl',
  templateUrl: './scripts/components/posts/posts.detail/posts.detail.html',
  providers: ['angularUtils.directives.dirDisqus', PostsService]
})

@Inject(PostsService)
export default class PostsDetailComponent {
  @Resolve()
  @Inject(PostsService)
  static resolve(PostsService, $stateParams) {
    return PostsService.get($stateParams.post);
  }

  constructor(PostsService) {
    this.post = PostsService.post;
  }
}
