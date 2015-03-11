'use strict';

angular.module('app')
    .factory('ServerErrorHttpInterceptorService', function (ErrorService, $q) {
        return {
            responseError: function (rejection) {
                ErrorService.setError(rejection.statusText + ' "' + rejection.config || rejection.config.url + '".');

                return $q.reject(rejection);
            }
        };
    });
