'use strict';

angular.module('app').directive('loadingContainer', function() {
  return {
    restrict : 'A',
    scope : false,
    link : function(scope, element, attrs) {
      var loadingLayer = angular.element('<div class="loadingContainer"></div>');
      element.append(loadingLayer);
      element.addClass('loading-container');
      scope.$watch(attrs.loadingContainer, function(value) {
        loadingLayer.toggleClass('ng-hide', !value);
      });
    }
  };
});