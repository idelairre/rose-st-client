import koa from 'koa';
import serve from 'koa-static';
import userAgent from 'koa-useragent';
import views from 'koa-render';
import path from 'path';
import axios from 'axios';
import util from 'util';
import request from 'koa-request';
import striptags from 'striptags';

import { SERVER_URL } from './scripts/constants/constants';

const router = require('koa-router')();
const app = koa();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8000;

const IMAGE_URL = 'https://raw.githubusercontent.com/idelairre/rose_st_client/master/app/images/10612805_674783332611610_5602889381423136186_n.jpg';

function renderTemplate(meta) {
  const template = (`
    <!doctype html>
    <html class="no-js">
    <head>
      <meta charset="utf-8">
      <base href="/">
      <title>Rose St. Community Center</title>
      <meta name="viewport" content="width=device-width">
      <meta property="og:image" content="${IMAGE_URL}" />
      <meta property="twitter:image" content="${IMAGE_URL}" />
      ${meta || ''}
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
  return template;
}

function compileTemplate (request, data) {
  const url = `https://${request.headers.host}${request.url}`;
  const meta = (`
    <meta property="twitter:url" content="${url}" />
    <meta property="twitter:site" content="@rosestreet" />
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:description" content="${striptags(data.subheading)}" />
    <meta property="twitter:title" content="${data.title}" />
    <meta property="og:title" content="${data.title}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Rose St. Community Center" />
    <meta property="og:type" content="article" />
    <meta property="og:description" content="${striptags(data.subheading)}" />
  `);
  return renderTemplate(meta);
}


app.use(function *(next) {
  console.log('%s - %s %s', new Date().toISOString(), this.req.method, this.req.url);
  yield next;
});

router.get('/', function *(next) {
  yield next;
  this.body = renderTemplate(); // this stays
});

router.get('/posts/', function *(next) {
  yield next;
  this.body = renderTemplate(); // this stays
});

router.get('/posts/:title_url', function *(next) {
  const options = {
    method: 'GET',
    url: `${SERVER_URL}/posts/${this.params.title_url}`
  };
  console.log();
  const response = yield request(options); //Yay, HTTP requests with no callbacks!
  this.body = compileTemplate(this.req, JSON.parse(response.body));
});


app.use(serve('static/dist')); // this stays

app.use(router.routes());


app.use(userAgent());

app.listen(port, () => {
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
