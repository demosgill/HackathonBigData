/*global accounting:false */
'use strict';
// sample use {{ value | acCurrency:'USD' }}
angular.module('filters').filter('number', ['filtersUtil', function(filtersUtil) {
  return function(number, precision) {

    if (precision === undefined) {
      precision = 2;
    }

    var format = '%v';

    var result = filtersUtil.getNumberFormatSigns();

    return accounting.formatNumber(number, precision, result.thousand, result.decimal, format);
  };
}]);