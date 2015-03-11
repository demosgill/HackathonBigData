var config = require('./gulp-config.js');
var utils = require('./gulp-utils.js');

var gulp = require('gulp');
var bower = require('main-bower-files');
var karma = require('gulp-karma');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var es = require('event-stream');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var cssmin = require('gulp-cssmin');
var connect = require('gulp-connect');
var open = require('gulp-open');
var order = require("gulp-order");
var prefix = require("gulp-prefix");
var debug = require('gulp-debug');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var shell = require('gulp-shell');
var replace = require('gulp-token-replace');
var rename = require('gulp-rename');

var paths = config.paths;
var patterns = config.patterns;
var env = config.env;


function copyFiles(fileExt, devDest, distDest) {
  var devResult = gulp.src(paths.src + fileExt)
    .pipe(gulp.dest(devDest || paths.dev));

  return utils.execForDist(devResult, function () {
    return devResult
      .pipe(gulp.dest(distDest || paths.dist));
  });
}

function appendCache(path) {
  path.basename += '.cache'
}

gulp.task('connect', function () {
  connect.server({
    root: 'dev',
    livereload: true
  });
});

gulp.task('clean', function () {
  utils.clean([paths.dist, paths.dev, paths.prod, 'karma_html', 'karma_unit', 'coverage']);
});

gulp.task('build-info', function () {
  console.info('==========================================================');
  console.info('  building... ');
  console.info('==========================================================');
});

gulp.task('build-app-img', function () {
  return copyFiles(patterns.imgFiles);
});

gulp.task('build-app-fonts', function () {
  return copyFiles(patterns.fontFiles, paths.devLib, paths.distLib);
});


gulp.task('build-app-six-css', function () {
  return gulp.src(paths.src + '**/six.css')
    .pipe(concat('six.css'))
    .pipe(gulp.dest(paths.devStyles))
    .pipe(rev())
    .pipe(rename(appendCache))
    .pipe(gulp.dest(paths.distStyles));
});

gulp.task('build-app-json', function () {
  copyFiles('**/*.tsv');
  return copyFiles(patterns.jsonFiles);
});

gulp.task('build-app-css', function () {
  var devResult = gulp.src(paths.src + '**/*.css')
    .pipe(concat('zoom.css'))
    .pipe(gulp.dest(paths.devStyles));
  return utils.execForDist(devResult, function () {
    return devResult
      .pipe(cssmin())
      .pipe(rev())
      .pipe(rename(appendCache))
      .pipe(gulp.dest(paths.distStyles));
  });
});

gulp.task('build-app-htaccess', function () {
  return copyFiles('.htaccess');
});

gulp.task('build-app-favicon', function () {
  return copyFiles('favicon.ico');
});

gulp.task('build-app-404', function () {
  return copyFiles('404.html');
});

gulp.task('build-app-dev', function () {
  return utils.prepareScripts(paths.src, patterns.htmlTemplateFiles, patterns.jsSrcFiles, patterns.jsConfigFiles)
    .pipe(gulp.dest(paths.dev))
    .pipe(filter('**/!(chartFormats).js'))
    .pipe(filter('**/!(templates).js'))
    .pipe(filter('**/!(maps.*).js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('build-lib', function () {
  var jsFilesFilter = filter(patterns.jsFiles);
  var jsDevLibFolder = gulp.dest(paths.devLib + 'js/');
  var cssFilesFilter = filter(patterns.cssFiles);
  var cssDevLibFolder = gulp.dest(paths.devLib + 'css/');

  var devResult = es.merge(gulp.src(bower())
      .pipe(filter('**/!(highmaps*.js)'))
      .pipe(filter('**/!(highcharts.src.js)')),
    gulp.src('bower_components/highcharts/modules/data.js'),
    gulp.src('bower_components/highcharts/modules/drilldown.js'),
    gulp.src('bower_components/highmaps/modules/map.js'),
    gulp.src('bower_components/accounting/accounting.min.js'),
    gulp.src('bower_components/angular-bootstrap/ui-bootstrap.min.js'),
    gulp.src('bower_components/valdr/valdr-message.min.js'))
    .pipe(flatten())
    .pipe(jsFilesFilter)
    .pipe(jsDevLibFolder);

  var step5 = devResult
    .pipe(jsFilesFilter.restore())
    .pipe(cssFilesFilter)
    .pipe(cssDevLibFolder);

  return step5
    .pipe(cssFilesFilter.restore());
});

gulp.task('inject-index-dev', ['build-dev'], function () {
  return utils.injectScriptNames(paths.dev)
    .pipe(connect.reload());
});

gulp.task("url", ['connect'], function () {
  var options = {
    url: "http://localhost:8080",
    app: "chrome.exe"
  };
  gulp.src("dev/index.html")
    .pipe(open("", options));
});


gulp.task('build', [
  'build-info',
  'build-app-htaccess',
  'build-app-favicon',
  'build-app-404',
  'build-app-img',
  'build-app-fonts',
  'build-app-six-css',
  'build-app-json',
  'build-app-css',
  'build-lib']);

gulp.task('test-dev', ['inject-index-dev'],
  shell.task(['echo executing tests... && karma start --singleRun & echo done'])
);

gulp.task('default', ['minify-dist'], function () {
  return utils.injectScriptNames(paths.prod, env.prod);
});

gulp.task('build-dev', ['build-app-dev', 'build']);

gulp.task('dev', ['test-dev', 'url'], function () {
  gulp.watch([paths.src + patterns.anyFile, 'test/' + patterns.anyFile], ['build-info', 'test-dev']);
});
