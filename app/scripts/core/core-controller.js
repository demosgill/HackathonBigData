'use strict';
String.prototype.endsWith = function (suffix) {
  return this && this.indexOf(suffix, this.length - suffix.length) !== -1;
};

angular.module('core')
  .controller('MainCtrl',
  function ($rootScope, $scope, $location, $translate, $filter, $q, Err, breadcrumbs, LoginService) {
    $scope.breadcrumbs = breadcrumbs;
    $scope.$location = $location;

    $scope.logout = function() {
      LoginService.logout();
    };

    $scope.isAdmin = false;

    $scope.go = function (path) {
      $location.path(path);
    };

    $scope.showFullTable = function () {
      var thresholdWidthBetweenMobileAndFullView = 768; // note: this is a total hack! didn't find any better solution
      return window.innerWidth > thresholdWidthBetweenMobileAndFullView;
    };
    $scope.showWideChart = function () {
      return window.innerWidth > 1100;
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };

    $scope.hasSettlingRefNo = function () {
      if ($location.search().isCurrent !== undefined || $location.search().settlingRefNo !== undefined) {
        return true;
      } else {
        return false;
      }
    };

    $scope.getSelectedLanguage = function () {
      return $translate.use() || '_';
    };

    $scope.getSelectedLanguageShort = function () {
      return $scope.getSelectedLanguage().split('_')[0];
    };

    $scope.getUserCountry = function () {
      return $scope.getSelectedLanguage().split('_')[1];
    };

    $rootScope.goBack = function () {
      window.history.back();
    };

    var setSupportUrl = function () {
      $scope.customerServiceUrl = 'https://www.six-payment-services.com/' + $scope.getSelectedLanguageShort() +
        '/shared/contacts.html#ch';
    };
    $scope.$watch('getUserCountry()', setSupportUrl);
  });
