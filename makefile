UNAME := $(shell uname)
MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(notdir $(patsubst %/,%,$(dir $(MKFILE_PATH))))


BABEL_CMD = NODE_PATH=$(CURRENT_DIR) node --harmony ./babel.server

start:
	gulp watch && $(BABEL_CMD)
