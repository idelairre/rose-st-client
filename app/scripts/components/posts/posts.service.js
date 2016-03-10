import axios from 'axios';
import { Injectable, Inject } from 'ng-forward';
import { SERVER_URL } from '../../constants/constants';
import 'angular-resource';

@Injectable()
@Inject('$resource')
export default class PostsService {
  constructor($resource) {
    return $resource(`${SERVER_URL}/posts/:title_url`, { title_url: '@title_url' }, {
			query: {
				method: 'GET',
				cache: true
			},
      get: {
        method: 'GET',
        cache: true
    	}
		});
  }
}
