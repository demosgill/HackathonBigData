'use strict';
Array.prototype.clear = function() {
  while (this.length > 0) {
    this.pop();
  }
};

angular.module('app')
  .directive('sxErrorBar', ['$rootScope', '$location', '$filter', function ($rootScope, $location, $filter) {
    return {
      replace: true,
      templateUrl: 'scripts/core/directives/errorBar.tpl.html',
      link: function (scope) {
        scope.errors = [];
        scope.errorVisibilities = [];

        $rootScope.$on('$routeChangeStart', function() {
          scope.errors.clear();
          scope.errorVisibilities.clear();
        });

        function replaceParams(message, params) {
          var i = 0;
          while(params && message.indexOf('{}') >= 0 && params.length > i) {
            message = message.replace('{}', $filter('translate')(params[i++]));
          }
          return message;
        }

        function translate(exception) {
          exception.message = replaceParams($filter('translate')(exception.message), exception.params);
        }

        $rootScope.$on('ServerError', function (event, exception) {
          if($location.path() !== '/error') {
            translate(exception);
            scope.errors.push(exception);
            scope.errorVisibilities.push(false);
          }
        });

        scope.dismiss = function (error) {
          var index = scope.errors.indexOf(error);

          scope.errors.splice(index, 1);
          scope.errorVisibilities.splice(index, 1);
        };

        scope.hasDetails = function(error) {
          return error.url !== undefined || error.stacktrace !== undefined;
        };
        
        scope.showDetails = function(error) {
          var index = scope.errors.indexOf(error);
          scope.errorVisibilities[index] = !scope.errorVisibilities[index];
        };

        scope.isDetailActive = function (error) {
          var index = scope.errors.indexOf(error);
          return scope.errorVisibilities[index];
        };
      }
    };
  }]);
