import { Inject } from 'ng-forward';

@Inject('$sceDelegateProvider')
class SceWhitelist {
  constructor($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://raw.githubusercontent.com/angular-ui/bootstrap/master/template/pagination/pagination.html'
    ]);
  }

  static init($sceDelegateProvider) {
    SceWhitelist.instance = new SceWhitelist($sceDelegateProvider);
    return SceWhitelist.instance;
  }
}

export default angular.module('roseStClient.whitelist', []).config(SceWhitelist.init);
