import angular from 'angular';
import { bootstrap } from 'ng-forward';
import AnayticsConfig from './config/routes.config';
import RouteConfig from './config/routes.config';
import StateReload from './config/state-reload.config';
import SceWhitelist from './config/sce-whitelist.config';
import MainComponent from './components/main/main.component';
import 'angular-animate';
import 'angular-messages';
import 'angular-resource';
import 'angular-socialshare';
import 'angular-ui-bootstrap';
import 'angular-ui-router';
import 'angular-input-masks';
import 'babel-polyfill';
import 'ng-currency-mask';
import 'reflect-metadata';

bootstrap(MainComponent, [
  '720kb.socialshare',
  'ngAnimate',
  'ngMessages',
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  'ui.utils.masks',
  AnayticsConfig.name,
  RouteConfig.name,
  SceWhitelist.name
]);
