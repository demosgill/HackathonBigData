'use strict';

angular.module('app', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',

  'uiGmapgoogle-maps',
  'highcharts-directive',
  'pascalprecht.translate',
  'ng-breadcrumbs',
  'cfp.hotkeys',
  'ui.bootstrap',
  'valdr',

  'core',
  'basic',
  'landing',
  'configuration',
  'filters'
])
  .factory('HttpHeaders', function () {
    return {
      headers: {},
      getPostHeaders: function () {
        return {
          'Content-type': 'application/json;charset=UTF-8',
          'REMOTE_USER': this.headers.REMOTE_USER
        };
      }
    };
  })
  .config(function ($locationProvider, $routeProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });

    $locationProvider.html5Mode(false); // make sure future angular versions won't use html5 mode (IE 8 doesn't support that)

    $routeProvider
      .when('/maintenance', {
        templateUrl: 'scripts/error/maintenance.tpl.html',
        controller: 'ErrorCtrl'
      })
      .when('/error', {
        templateUrl: 'scripts/error/general-error.tpl.html',
        controller: 'ErrorCtrl'
      })
      .when('/basic', {
        templateUrl: 'scripts/basic/basic.tpl.html',
        controller: 'BasicCtrl'
      })
      .when('/landing', {
        templateUrl: 'scripts/landing/landing.tpl.html',
        controller: 'LandingCtrl'
      })
      .otherwise({
        redirectTo: '/landing'
      });
  })
  .run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function () {
      $location.path('/landing');
    });
  });
