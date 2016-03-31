UNAME := $(shell uname)
MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(notdir $(patsubst %/,%,$(dir $(MKFILE_PATH))))

build-client:
	webpack --colors --display-error-details --config configs/webpack.config.js
build-prod:
		webpack --colors --display-error-details --config configs/webpack.config-prod.js
start-dev:
	NODE_PATH=$(CURRENT_DIR) NODE_ENV=development node ./babel.server.js
start-prod:
	NODE_PATH=$(CURRENT_DIR) NODE_ENV=production node ./babel.server.js
watch-client:
	NODE_ENV=development webpack-dev-server --config configs/webpack.config-watch.js --display-error-details
