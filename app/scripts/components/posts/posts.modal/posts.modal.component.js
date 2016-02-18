import { Component, Inject } from 'ng-forward';

@Component({
  selector: 'posts-modal',
  controllerAs: 'postsModalCtrl',
  templateUrl: './scripts/components/posts/posts.modal/posts.modal.html',
  providers: ['ui.bootstrap.modal']
})

@Inject('$uibModalInstance')
export default class PostsModalComponent {
  constructor($uibModalInstance) {
    this.$uibModalInstance = $uibModalInstance;
    this.post = {};
  }

  // needs crud actions

  ok() {
    this.$uibModalInstance.close();
  }

  cancel() {
    this.$uibModalInstance.dismiss();
  }
}
