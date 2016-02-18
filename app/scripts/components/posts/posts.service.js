import AuthService from '../../services/authentication.service'
import axios from 'axios';
import { Injectable, Inject } from 'ng-forward';
import { SERVER_URL } from '../../constants/constants';
import slug from 'slug';
import 'babel-polyfill';

@Injectable()
@Inject(AuthService)
export default class PostsService {
	constructor(AuthService) {
		this.AuthService = AuthService;
		this.posts = [];
		this.post = {};
	}

	resetPost () {
		angular.copy({}, this.post);
	}

	async getPosts() {
		try {
			let response = await axios.get(`${SERVER_URL}/posts/`);
			angular.copy(response.data, this.posts);
			console.log(this.posts);
		} catch (error) {
			console.error(error);
		}
	}

	async getPost(titleUrl) {
		try {
			let response = await axios.get(`${SERVER_URL}/posts/${titleUrl}`);
			angular.copy(response.data, this.post);
			console.log(this.post);
		} catch (error) {
			console.error(error);
		}
	}


	async upsertPost(post, userId) {
	  let params = {
	    post: {
	      title: post.title,
	      body: post.body,
	      subheading: post.subheading,
	      user_id: userId,
	      title_url: slug(post.title)
	    }
	  };
	  try {
	    if (post.id) {
	      let response = await axios.patch(`${SERVER_URL}/posts/${post.title_url}`, params);
	      console.log(response);
	    } else {
	      let response = await axios.post(`${SERVER_URL}/posts/`, params);
	      this.posts.push(response.data);
	    }
	  } catch (error) {
	    console.error(error);
	  }
	}

	async deletePost(id, titleUrl) {
		try {
			await axios.delete(`${SERVER_URL}/posts/${titleUrl}`);
			this.posts.splice(this.findById(id), 1);
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
