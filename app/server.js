import axios from 'axios';
import config from '../configs/webpack.config-watch';
import convert from 'koa-convert';
import compress from 'koa-compress';
import cors from 'koa-cors';
import constants from '../app/scripts/constants/constants';
import fs from 'fs-extra';
import helpers from '../configs/helpers';
import koa from 'koa';
import render from 'koa-ejs';
import schedule from 'node-schedule';

const app = koa();
const router = require('koa-router')();
const hostname = process.env.HOSTNAME || 'localhost';
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

config.meta = {
  title: constants.SITE_NAME,
  favicon: constants.ICON,
  env: process.env.NODE_ENV,
  metadata: {
    image: constants.IMAGE_URL,
    description: constants.DESCRIPTION,
    name: constants.SITE_NAME,
    type: 'website',
    url: process.env.HOSTNAME || 'localhost'
  }
}

console.log('[SERVER] hostname: ', hostname);
console.log('[SERVER] env: ', env);

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const compiler = webpack(config);
  const webpackDevMiddleware = require('koa-webpack-dev-middleware');
  const webpackHotMiddleware = require('koa-webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: false,
      modules: false,
      children: true,
      profile: false
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 5 * 1000
  }));
}

if (process.env.NODE_ENV === 'production') {
  const serve = require('koa-static');
  app.use(serve('static'));
}

const getPost = titleUrl => {
  let posts = fs.readJsonSync(helpers.root('app/cache.json'), 'utf8');
  for (let i = 0; posts.length > i; i += 1) {
    if (posts[i].title_url === titleUrl) {
      return posts[i];
    }
  }
  return false;
}

const task = schedule.scheduleJob({
  hour: 0,
  minute: 0,
  dayOfWeek: 0
}, function() {
  axios.get(`${SERVER_URL}/posts`).then(response => {
    if (response.data !== fs.readJsonSync(helpers.root('app/cache.json'), 'utf8')) {
      fs.writeJsonSync(helpers.root('app/cache.json'), JSON.stringify(response.data));
    }
  });
});

render(app, {
  root: helpers.root('app'),
  layout: 'index',
  viewExt: 'html',
  cache: false,
  debug: true
});

router.get('/posts/:title_url', function*(next) {
  const data = getPost(this.params.title_url);
  Object.assign(config.meta.metadata, {
    title: data.title,
    description: data.subheading,
    publishedTime: data.created_at,
    modifiedTime: data.updated_at,
    type: 'article',
    url: this.request.href
  });
  yield this.render('index', {
    webpackConfig: config
  });
});

router.get('*', function*(next) {
  yield this.render('index', {
    webpackConfig: config
  });
});

app.use(cors());

app.use(router.routes());

app.use(router.allowedMethods());

app.use(compress());

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  }
  // console.info('==> ✅  Node vars:', process.env);
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
