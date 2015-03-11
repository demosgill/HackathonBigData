'use strict';

describe('ErrorService', function () {

  // load the controller's module
  beforeEach(module('app'));

  var $location,
    $httpBackend,
    srv;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$location_, _$httpBackend_, ErrorService) {
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    srv = ErrorService;
  }));

  describe('if an error is set', function () {
    it('should keep it inmemory', function () {
      expect(srv.getError()).toBeUndefined();
      var errorValue = 'test';
      srv.setError(errorValue);
      expect(srv.getError()).toBe(errorValue);
    });
  });

});
