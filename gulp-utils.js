'use strict';
var config = require('./gulp-config.js');

var gulp = require('gulp');
var del = require('del');
var order = require("gulp-order");
var inject = require('gulp-inject');
var angularTemplatecache = require('gulp-angular-templatecache');
var es = require('event-stream');
var minifyHtml = require('gulp-minify-html');
var replace = require('gulp-token-replace');
var filter = require('gulp-filter');

function Utils() {
  this._minify = false;
  this._buildDist = false;
}

Utils.prototype = {
  minify: function () {
    return this._minify;
  },
  buildDist: function () {
    return this._buildDist;
  }
};

Utils.prototype.clean = function (directories) {
  return del(directories, function (err, deletedFiles) {
    console.log('Files deleted:', deletedFiles.join(', '));
  });
};

Utils.prototype.prepareScripts = function (srcDir, htmlTemplatesPattern, jsFilesPattern, configFilesPattern) {
  console.info('preparing files from ' + srcDir + htmlTemplatesPattern + ', ' + srcDir + jsFilesPattern + ', ' + srcDir + configFilesPattern);
  var angularTemplateCacheOptions = {
    module: 'app'
  };
  var minifyHtmlOtions = {
    quotes: true,
    empty: true
  };

  var allHtml = gulp.src(srcDir + htmlTemplatesPattern)
    .pipe(minifyHtml(minifyHtmlOtions));

  var allScripts = es.merge(
    allHtml
      .pipe(angularTemplatecache(angularTemplateCacheOptions)),
    gulp.src(srcDir + jsFilesPattern),
    gulp.src(srcDir + configFilesPattern));

  return allScripts;
};

Utils.prototype.injectScriptNames = function (destinationDir) {
  var cssLibFiles = es.merge(
    gulp.src(destinationDir + config.paths.lib + config.patterns.cssFiles, {read: false}),
    gulp.src(destinationDir + config.paths.styles + '*.css', {read: false})
  )
    .pipe(order(config.cssOrder));

  var jsAppFiles = gulp.src(destinationDir + config.patterns.jsFiles, {read: false})
    .pipe(order(config.jsOrder));

  var injectOptions = {ignorePath: destinationDir, addRootSlash: false};

  return gulp.src(config.paths.src + config.paths.indexHtml)
    .pipe(inject(cssLibFiles, injectOptions))
    .pipe(inject(jsAppFiles, injectOptions))
    .pipe(gulp.dest(destinationDir));
};


Utils.prototype.execForDist = function (previousStep, executeConditional) {
  var nextStep = previousStep;
  if (this.buildDist()) {
    nextStep = executeConditional();
  }
  return nextStep;
};

var inst = new Utils();
module.exports = inst;
