'use strict';

var mocks = angular.module('app');
mocks.provider('GraphColors', function () {
  this.$get = function ($q) {
    var GraphColors = jasmine.createSpyObj('GraphColors', ['get']);
    //console.info('using mock GraphColors provider');
    GraphColors.get.andReturn({
      $promise: $q.when([
        { rgb: '0,0,0' },
        { rgb: '1,1,1' },
        { rgb: '2,2,2' },
        { rgb: '3,3,3' }
      ])
    });

    return GraphColors;
  }
});

function getMockedLanguage($translate) {
  if($translate.use() === 'en_US') {
    return {
      ACCOUNT_ACTIVITY_TITLE: 'Account Activity',
      COL_DATE: 'Date',
      COL_TRX_TYPE: 'Type',
      COL_TRX_REFERENCE: 'Reference',
      COL_DELIVERED_REFERENCE: 'Delivered Reference'
    };
  }
  else {
    return {
      COL_DATE: 'Datum',
      COL_TRX_TYPE: 'Typ',
      COL_TRX_REFERENCE: 'Referenz',
      COL_DELIVERED_REFERENCE: 'Eingelieferte Referenz'
    };
  }
}

mocks.provider('translationsFactory', function () {
  this.$get = function ($q, $translate) {
    var translationsFactory = jasmine.createSpyObj('translationsFactory', ['get']);
    translationsFactory.get.andReturn({
      $promise: $q.when(
        getMockedLanguage($translate)
      )
    });

    return translationsFactory;
  }
});