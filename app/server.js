import axios from 'axios';
import config from '../configs/webpack.config-watch';
import compress from 'koa-compress';
import cors from 'koa-cors';
import fs from 'fs-extra';
import helpers from '../configs/helpers';
import history from 'koa-connect-history-api-fallback';
import koa from 'koa';
import path from 'path';
import render from 'koa-ejs';
import schedule from 'node-schedule';
import server from 'koa-static'
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import userAgent from 'koa-useragent';
import 'babel-polyfill';

const app = koa();
const router = require('koa-router')();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

config.meta.metadata.url = process.env.HOSTNAME;

console.log('[SERVER] hostname: ', config.meta.metadata.url);

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true,
      profile: false
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 5 * 1000
  }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(server('static'));
}

function getPost(titleUrl) {
  let posts = fs.readJsonSync(helpers.root('app/cache.json'), 'utf8');
  for (let i = 0; posts.length > i; i += 1) {
    if (posts[i].title_url === titleUrl) {
      return posts[i];
    }
  }
  return false;
}

const task = schedule.scheduleJob({ hour: 0, minute: 0, dayOfWeek: 0 }, function () {
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

app.use(cors());

app.use(history());

app.use(router.routes());

app.use(router.allowedMethods());

app.use(compress());

app.use(userAgent());

app.listen(port, (error) => {
  if (error) {
     console.error(error);
  }
  // console.info('==> ✅  Node vars:', process.env);
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
