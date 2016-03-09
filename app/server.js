import koa from 'koa';
import serve from 'koa-static';
import userAgent from 'koa-useragent';
import views from 'koa-render';
import path from 'path';
import axios from 'axios';
import util from 'util';
import request from 'koa-request';
import cors from 'koa-cors';
import logger from 'koa-logging';
import bunyan from 'bunyan';

import { SERVER_URL } from './scripts/constants/constants';

const router = require('koa-router')();

const app = koa();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8000;

const IMAGE_URL = 'https://raw.githubusercontent.com/idelairre/rose_st_client/master/app/images/10612805_674783332611610_5602889381423136186_n.jpg';
const DESCRIPTION = '74 blocks (with the goal of 100) in East Baltimore where the peace is encouraged by the youth of the community, NOT THE POLICE!';
const SITE_NAME = 'Rose St. Community Center';

function renderMeta(request, data) {
  const URL = request.href;

  if (data) {
    const meta = (`
      <meta itemprop='name' content='${data.title}'>
      <meta itemprop='description' content='${data.subheading}'>
      <meta itemprop='image' content='${IMAGE_URL}'>
      <meta property='twitter:url' content='${URL}' />
      <meta property='twitter:site' content='@rosestreet' />
      <meta property='twitter:card' content='summary' />
      <meta property='twitter:description' content='${data.subheading}' />
      <meta property='twitter:title' content='${data.title}' />
      <meta property='og:title' content='${data.title}' />
      <meta property='og:url' content='${URL}' />
      <meta property='og:site_name' content='${SITE_NAME}' />
      <meta property='og:type' content='article' />
      <meta property='og:description' content='${data.subheading}' />
      <meta property='article:published_time' content='${data.created_at}' />
      <meta property='article:modified_time' content='${data.updated_at}' />
    `);
    return meta;
  } else {
     const meta = (`
      <meta itemprop='name' content='${SITE_NAME}'>
      <meta itemprop='description' content='${DESCRIPTION}'>
      <meta itemprop='image' content='${IMAGE_URL}'>
      <meta property='twitter:url' content='${URL}' />
      <meta property='twitter:site' content='@rosestreet' />
      <meta property='twitter:card' content='website' />
      <meta property='twitter:description' content='${DESCRIPTION}' />
      <meta property='twitter:title' content='${SITE_NAME}' />
      <meta property='og:title' content='${SITE_NAME}' />
      <meta property='og:url' content='${URL}' />
      <meta property='og:site_name' content='${SITE_NAME}' />
      <meta property='og:type' content='website' />
      <meta property='og:description' content='${DESCRIPTION}' />
    `);
    return meta;
  }
}

function renderTemplate(request, data) {
  const template = (`
    <!doctype html>
    <html class='no-js'>
    <head>
      <meta charset='utf-8'>
      <base href='/'>
      <title>Rose St. Community Center</title>
      <meta name='viewport' content='width=device-width'>
      ${renderMeta(request, data)}
      <link rel='icon' type='image/png' href='favicon.ico' />
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'>
      <link rel='stylesheet' href='styles/bootstrap.css'>
      <link rel='stylesheet' href='styles/main.css'>
    </head>
    <body>
      <!--[if lt IE 7]>
          <p class='browsehappy'>You are using an <strong>outdated</strong> browser. Please <a href='http://browsehappy.com/'>upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
      <rose-st-client></rose-st-client>
      <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
      <script>
        ! function (A, n, g, u, l, a, r) {
          A.GoogleAnalyticsObject = l, A[l] = A[l] || function () {
              (A[l].q = A[l].q || []).push(arguments)
            }, A[l].l = +new Date, a = n.createElement(g),
            r = n.getElementsByTagName(g)[0], a.src = u, r.parentNode.insertBefore(a, r)
        }(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-74903814-1');
        ga('send', 'pageview');
      </script>
      <script src='scripts/app.js'></script>
    </body>
    </html>`
  );
  return template;
}

const opts = {
    name: 'rose-st-client',
    logRequest: false,
    logResponse: true,
    logError: true,
    serializers: bunyan.stdSerializers, // bunyan serializers, { logId, req, res, ctx, err, start, responseTime, contentLength }
    bunyanArgs: {}
};

app.use(logger(opts));

app.use(cors());

app.use(function *(next) {
  this.log.info({
    logId: this.logId
  });
  // console.log('%s - %s %s', new Date().toISOString(), this.req.method, this.req.url);
  yield next;
});

router.get('*', function *(next) {
  let req = this.request.href.split('/');
  let params = req.slice(req.length - 2, req.length);
  if (params[0] === 'posts' && params[1]) {
    const options = {
      method: 'GET',
      url: `${SERVER_URL}/posts/${this.params.title_url}`
    };

    const response = yield request(options);

    this.type = 'text/html';
    this.body = renderTemplate(this.request, JSON.parse(response.body));
  } else {
    yield (callback) => {
      this.type = 'text/html';
      this.body = renderTemplate(this.request);
      callback(null);
    }
  }
});

app.use(serve('static/dist')); // this stays

app.use(router.routes());

app.use(router.allowedMethods());

app.use(userAgent());

app.listen(port, () => {
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to http://%s:%s', hostname, port);
});
