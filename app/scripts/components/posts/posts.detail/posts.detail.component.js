import { Component, Resolve, Inject, EventEmitter } from 'ng-forward';
import PostsService from '../posts.service';
import ToTrusted from '../../../filters/to-trusted.filter';
import 'angular-utils-disqus';
import 'babel-polyfill';

@Component({
  selector: 'posts-detail',
  controllerAs: 'postsDetailCtrl',
  template: require('./posts.detail.html'),
  pipes: [ToTrusted],
  providers: ['angularUtils.directives.dirDisqus', PostsService]
})

@Inject('$scope', '$state', '$stateParams', 'post', PostsService)
export default class PostsDetailComponent {
  @Resolve()
  @Inject('$stateParams', PostsService)
  static async post($stateParams, PostsService) {
    let post = await PostsService.get({ titleUrl: $stateParams.post });
    return await post.$promise;
  }

  constructor($scope, $state, $stateParams, post) {
    $scope.$emit('post', post);
    this.post = post;
    this.disqusConfig = {
      disqus_shortname: 'rosestcommunitycenter',
      disqus_identifier: $state.href($state.current.name, $state.params, { absolute: false }),
      disqus_url: $state.href($state.current.name, $state.params, { absolute: true }),
      disqus_title: this.post.title
    };
  }
}
