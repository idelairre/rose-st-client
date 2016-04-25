import { Component, Resolve, Inject, EventEmitter } from 'ng-forward';
import PostsService from '../posts.service';
import 'angular-utils-disqus';

@Component({
  selector: 'posts-detail',
  controllerAs: 'postsDetailCtrl',
  template: require('./posts.detail.html'),
  providers: ['angularUtils.directives.dirDisqus', PostsService]
})

@Inject('$scope', '$sce', '$state', '$stateParams', 'post', PostsService)
export default class PostsDetailComponent {
  @Resolve()
  @Inject('$stateParams', PostsService)
  static async post($stateParams, PostsService) {
    let post = await PostsService.get({ titleUrl: $stateParams.post });
    return await post.$promise;
  }

  constructor($scope, $sce, $state, $stateParams, post) {
    $scope.$emit('post', post);
    this.post = post;
    this.post.body = $sce.trustAsHtml(this.post.body);
    this.disqusConfig = {
      disqus_shortname: 'rosestcommunitycenter',
      disqus_identifier: $state.href($state.current.name, $state.params, { absolute: false }),
      disqus_url: $state.href($state.current.name, $state.params, { absolute: true }),
      disqus_title: this.post.title
    };
  }
}
