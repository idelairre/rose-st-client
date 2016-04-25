UNAME := $(shell uname)
MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(notdir $(patsubst %/,%,$(dir $(MKFILE_PATH))))

build-client:
	NODE_ENV=production webpack --colors --display-error-details --config configs/webpack.config.js
build-server:
	NODE_ENV=production webpack --colors --display-error-details --config configs/webpack.config-server.js
build-prod:
	webpack --colors --display-error-details --config configs/webpack.config-prod.js
start-dev:
	HOSTNAME=localhost NODE_PATH=$(CURRENT_DIR) NODE_ENV=development node ./babel.server.js
start-prod:
	HOSTNAME=https://rose-st-api.herokuapp.com NODE_PATH=$(CURRENT_DIR) NODE_ENV=production node ./static/dist/server.js
watch-client:
	HOSTNAME=localhost NODE_ENV=development webpack-dev-server --config configs/webpack.config-watch.js --display-error-details
