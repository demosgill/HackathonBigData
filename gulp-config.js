'use strict';

function Config() {
}

var app = 'app/';
var dev = 'dev/';
var dist = 'dist/';
var lib = 'lib/';
var styles = 'styles/';

Config.prototype = {
  patterns: {
    anyFile: '**/*',
    jsFiles: '**/*.js',
    imgFiles: '**/images/**/*',
    fontFiles: '**/fonts/**/*',
    jsSrcFiles: '**/!(configuration)/!(*.spec).js',
    jsConfigFiles: '**/configuration/configuration.js',
    cssFiles: '**/*.css',
    jsonFiles: '**/*.json',
    htmlTemplateFiles: '**/*.tpl.html'
  },
  paths: {
    src: app,
    srcPatches: app + 'patches',
    lib: lib,
    styles: styles,

    dev: dev,
    devLib: dev + lib,
    devStyles: dev + styles,
    devApp: dev + 'app/',

    dist: dist,
    distLib: dist + lib,
    distStyles: dist + styles,
    distApp: dist + 'app/',

    prod: 'prod',

    indexHtml: 'index.html',
    templatesJs: 'templates.js',
    appJs: 'app.js'
  },
  jsOrder: [
    "lib/**/pdf*.js",
    "lib/**/jquery.js",
    "lib/**/angular.js",
    "lib/**/angular-*.js",
    "lib/**/highcharts.js",
    "lib/**/highcharts-more.js",
    "lib/**/map.js",
    "lib/**/exporting.js",
    "lib/**/valdr.js",
    "lib/**/!(*tpls).js",
    "**/app-module.js",
    "**/*-module.js",
    "lib/**/*tpls.js",
    "*.js"
  ],
  jsLibConcatOrder: [
    "**/jquery.js",
    "**/angular.js",
    "**/angular-*.js",
    "**/highcharts.js",
    "**/highcharts-more.js",
    "**/exporting.js",
    "**/valdr.js",
    "**/*.js"
  ],
  cssOrder: [
    "**/css/!(font-awesome).css",
    "six*.css",
    "**/css/font-awesome.css",
    "mp*.css"
  ]
};


var inst = new Config();
module.exports = inst;
