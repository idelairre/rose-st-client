import axios from 'axios';
import { Injectable, Inject } from 'ng-forward';
import { SERVER_URL } from '../../constants/constants';
import slug from 'slug';
import 'babel-polyfill';

@Injectable()
export default class PostsService {
	constructor() {
		this.posts = [];
		this.post = {};
	}

	reset() {
		angular.copy({}, this.post);
	}

	async query() {
		try {
			let response = await axios.get(`${SERVER_URL}/posts/`);
			angular.copy(response.data, this.posts);
		} catch (error) {
			console.error(error);
		}
	}

	async get(titleUrl) {
		try {
			let response = await axios.get(`${SERVER_URL}/posts/${titleUrl}`);
			angular.copy(response.data, this.post);
		} catch (error) {
			console.error(error);
		}
	}

	findById(id) {
		for (let i = 0; i < this.posts.length; i += 1) {
			if (this.posts[i].id === id) {
				return i;
			}
		}
	}
}
