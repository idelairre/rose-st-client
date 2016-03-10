import { Injectable, Inject } from 'ng-forward';
import { SERVER_URL } from '../../constants/constants';
import 'angular-resource';

@Injectable()
@Inject('$resource')
export default class PostsService {
  constructor($resource) {
    const opts = {
      query: { method: 'GET', isArray: true, cache: true },
      get: { method: 'GET', cache: true }
    };
    return $resource(`${SERVER_URL}/posts/:titleUrl`, {
      titleUrl: '@titleUrl'
    }, opts);
  }
}
