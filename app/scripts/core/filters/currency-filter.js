/*global accounting:false */
'use strict';
// sample use {{ value | acCurrency:'USD' }}
angular.module('filters').filter('currency', ['filtersUtil', function(filtersUtil) {
  return function(number, currencyCode, precision) {
    if (number === undefined || number === null) {
      return '';
    }

    if (precision === undefined) {
      precision = 2;
    }

    var format = '<span class="no-wrap"><span class="currency-symbol">%s</span> %v</span>';

    var result = filtersUtil.getNumberFormatSigns();

    return accounting.formatMoney(number, filtersUtil.getCurrencySymbol(currencyCode), precision, result.thousand,
        result.decimal, format);
  };
}]);
