UNAME := $(shell uname)
MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(notdir $(patsubst %/,%,$(dir $(MKFILE_PATH))))

start:
	NODE_PATH=$(CURRENT_DIR) NODE_ENV=production node --harmony ./dist/server.js
