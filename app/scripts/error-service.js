'use strict';

angular.module('app')
  .factory('ErrorService', function () {
    var error;

    function getError() {
      return error;
    }

    function setError(errorValue) {
      error = errorValue;
    }

    return {
      getError: getError,
      setError: setError
    };
  });
