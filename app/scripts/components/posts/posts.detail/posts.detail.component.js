import { Component, Resolve, Inject } from 'ng-forward';
import PostsService from '../posts.service';
import ToTrusted from '../../../filters/to-trusted.filter';
import 'angular-utils-disqus';

@Component({
  selector: 'posts-detail',
  controllerAs: 'postsDetailCtrl',
  template: require('./posts.detail.html'),
  pipes: [ToTrusted],
  providers: ['angularUtils.directives.dirDisqus', PostsService]
})

@Inject('$state', PostsService)
export default class PostsDetailComponent {
  @Resolve()
  @Inject('$stateParams', PostsService)
  static resolve($stateParams, PostsService) {
    return PostsService.get($stateParams.post);
  }

  constructor($state, PostsService) {
    this.post = PostsService.post;
    this.url = $state.href($state.current.name, $state.params, {absolute: true});
    this.identifier = $state.href($state.current.name, $state.params, {absolute: false});
  }
}
