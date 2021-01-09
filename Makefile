# GNU Make 3.8.2 and above

MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

clean:
	rm -rf dist tmp
	mkdir tmp
	mkdir -p dist

html:
	cp src/popup.html dist/popup.html

css:
	sass src/style.scss dist/style.css

js:
	esbuild src/popup.js --bundle --sourcemap --define:process.env.NODE_ENV=\"dev\" --loader:.js=jsx --outfile=dist/popup.js

assets:
	cp -r src/assets dist

start: clean js css html assets
	chokidar "src/**/*.js" -c "make js" \
	& chokidar "src/**/*.scss" -c "make css" \
	& chokidar "src/*.html" -c "make html" \
	& chokidar "src/assets/*" -c "make assets" \
