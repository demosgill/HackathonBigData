/*global ServerError*/
'use strict';

var app = angular.module('app');
app.factory('Err', function () {
  return {
    handleError: function(scope, reason) {
      if(reason && reason.byteLength) {
        reason.data = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(reason)));
      }
      if(reason) {
        scope.errorMsg = 'ERROR_SERVICE_OFFLINE';
        scope.errorParams = (reason.message || reason.config && reason.config.url);
      } else {
        scope.errorMsg = 'ERROR_UNKNOWN_PROBLEM';
        reason = {data:{message: scope.errorMsg}};
      }
      /*scope.errorMsg = JSON.stringify(reason);*/
      throw new ServerError(reason);
    }
  };
});
app.factory('TableConfigs', function () {
  return {};
});
app.factory('IntroVisibility', function () {
  return {
    visible: false
  };
});
app.factory('LoginService', function ($rootScope, $location, $cookies) {
  return {
    username: $cookies.username,
    login: function(username) {
      this.username = username;
      $cookies.username = username;
    },
    logout: function() {
      this.username = undefined;
      $cookies.username = undefined;
      $location.path('/login');
    }
  };
});
