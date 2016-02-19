import { Component, Inject } from 'ng-forward';
import AuthService from '../../services/authentication.service';
import 'babel-polyfill';

@Component({
  selector: 'login',
  controllerAs: 'loginCtrl',
  providers: [AuthService],
  template: require('./login.html')
})

@Inject(AuthService)
export default class LoginComponent {
  constructor(AuthService) {
    this.AuthService = AuthService;
    this.credentials = {};
  }

  async login(credentials) {
    try {
      let response = await this.AuthService.login(credentials);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  logout() {
    try {
      this.AuthService.logout();
    } catch (error) {
      console.error(error);
    }
  }
}
