import axios from 'axios';
import config from '../configs/webpack.server';
import compress from 'koa-compress';
import cors from 'koa-cors';
import fs from 'fs-extra';
import helpers from '../configs/helpers';
import koa from 'koa';
import logger from 'koa-logging';
import path from 'path';
import render from 'koa-ejs';
import schedule from 'node-schedule';
import serve from 'koa-static';
import userAgent from 'koa-useragent';
import { DESCRIPTION, IMAGE_URL, SERVER_URL, SITE_NAME } from './scripts/constants/constants';
import 'babel-polyfill';

const app = koa();
const router = require('koa-router')();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8000;

function getPost(titleUrl) {
  let posts = fs.readJsonSync('cache.json', 'utf8');
  for (let i = 0; posts.length > i; i += 1) {
    if (posts[i].title_url === titleUrl) {
      return posts[i];
    }
  }
  return false;
}

// const task = schedule.scheduleJob({ hour: 0, minute: 0, dayOfWeek: 0 }, function () {
//   axios.get(`${SERVER_URL}/posts`).then(response => {
//     if (response.data !== fs.readJsonSync(helpers.root('app/cache.json'), 'utf8')) {
//       fs.writeJsonSync(helpers.root('app/cache.json'), JSON.stringify(response.data));
//     }
//   });
// });

render(app, {
  root: helpers.root('app'),
  layout: 'index',
  viewExt: 'html',
  cache: false,
  debug: true
});

router.get('/posts/:title_url', function *(next) {
  const data = getPost(this.params.title_url);
  Object.assign(config.meta.metadata, {
    title: data.title,
    description: data.subheading,
    publishedTime: data.created_at,
    modifiedTime: data.updated_at,
    type: 'article',
    url: this.request.href
  });
  yield this.render('index', { webpackConfig : config });
});

router.get('*', function *(next) {
  yield this.render('index', { webpackConfig : config });
});

app.use(serve('static'));

app.use(cors());

app.use(router.routes());

app.use(router.allowedMethods());

app.use(compress());

app.use(userAgent());

app.listen(port, () => {
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});

// if (__DEV__) {
//   if (module.hot) {
//     console.log('[HMR] Waiting for server-side updates');
//     module.hot.accept();
//     module.hot.addStatusHandler((status) => {
//       if (status === 'abort') {
//         setTimeout(() => process.exit(0), 0);
//       }
//     });
//   }
// }
