import koa from 'koa';
import serve from 'koa-static';
import userAgent from 'koa-useragent';
import routes from './routes';
import views from 'koa-render';
import path from 'path';
import fs from 'fs';

const router = require('koa-router')();
const app = koa();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8000;

const template = (`
  <!doctype html>
  <html class="no-js">
  <head>
  	<meta charset="utf-8">
  	<base href="/">
  	<title>Rose St. Community Center</title>
  	<meta name="description" content="">
  	<meta name="viewport" content="width=device-width">

  	<link rel="icon" type="image/png" href="favicon.ico" />
  	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  	<link rel="stylesheet" href="styles/bootstrap.css">
  	<link rel="stylesheet" href="styles/main.css">
  </head>
  <body>
  	<!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->

  	<rose-st-client></rose-st-client>

  	<!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->

  	<script src="scripts/app.js"></script>
  </body>
  </html>`
);

app.use(function *(next) {
  console.log('%s - %s %s', new Date().toISOString(), this.req.method, this.req.url);
  yield next;
});

router.get('/', function *() {
  serve('index.html');
});

router.get('/(.*)', function *(next) {
  yield next;
  this.body = template;
});

app.use(serve('static/dist'));

app.use(router.routes());


app.use(userAgent());

app.listen(port, () => {
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
