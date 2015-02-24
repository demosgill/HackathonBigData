/*global $:false */
'use strict';

var filtersModule = angular.module('filters', [ 'pascalprecht.translate' ]);

filtersModule.factory('filtersUtil', [ '$translate', function($translate) {
  var currency = {};
/* don't translate any currency symbol
    USD : '$',
    GBP : '£',
    AUD : '$',
    EUR : '€',
    CAD : '$',
    MIXED : '~'
  };
*/

  return {
    getNumberFormatSigns : function() {
      // http://de.wikipedia.org/wiki/Dezimaltrennzeichen
      // http://de.wikipedia.org/wiki/DIN_1333
      var country = $translate.use() && $translate.use().split('_')[1];

      var values = {
        decimal : '.',
        thousand : '\''
      };

      if ($.inArray(country, [ 'DE', 'AT' ]) >= 0) {
        values.decimal = ',';
        values.thousand = '.';
      } else if ($.inArray(country, [ 'US', 'GB' ]) >= 0) {
        values.decimal = ',';
        values.thousand = '\u2009'; // short space
      }
      return values;
    },

    getCurrencySymbol : function(currencyCode) {
      var currencySymbol = currency[currencyCode];

      if (currencySymbol === undefined) {
        currencySymbol = currencyCode;
      }

      return currencySymbol;
    },

    getCurrencyCode : function(symbol) {
      var currencyCodes = '';
      $.each(currency, function(key, value) {
        if (value === symbol) {
          if (currencyCodes.length > 0) {
            currencyCodes += ',';
          }
          currencyCodes += key;
        }
      });
      return currencyCodes;
    }
  };
} ]);
