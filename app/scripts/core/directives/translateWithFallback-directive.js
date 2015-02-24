'use strict';

angular.module('app')
  .directive('translateWithFallback', ['$rootScope', '$translate', '$q', function($rootScope, $translate, $q) {
    return {
      replace : true,
      restrict : 'A',
      scope : false,
      link : function(scope, element, attrs) {
        var deferred, promise;

        $rootScope.$on('$translateChangeSuccess', function() {
          scope.setText();
        });

        scope.setText = function() {
          deferred = $q.defer();
          promise  = deferred.promise;

          promise.then(function(translation) {
            element.text(translation);
          });

          $translate(attrs.translateWithFallback).then(function(translation) {
            deferred.resolve(translation);
          }, function() {
            $translate(attrs.fallbackKey).then(function(translation) {
              deferred.resolve(translation);
            });
          });
        };

        scope.setText();
      }
    };
  }]);

