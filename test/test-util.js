beforeEach(function () {
  window.compileTemplate = function (template, scope) {
    return getInjector().invoke(compileTemplateFactory)(template);

    function compileTemplateFactory($rootScope, $compile) {
      return function (template) {
        if (!scope) {
          scope = $rootScope.$new();
        }
        var compiledTemplate = $compile(template)(scope);

        scope.$digest();

        return compiledTemplate;
      };
    }
  };

  window.createController = function (controllerName) {
    return getInjector().invoke(controllerFactory)(controllerName);

    function controllerFactory($rootScope, $controller) {
      return function (controllerName) {
        var scope = $rootScope.$new();
        scope.breadcrumbs = {breadcrumbs:[]};
        var controller = $controller(controllerName, {$scope: scope});

        controller._scope = scope;

        return controller;
      };
    }
  };

  function getInjector() {
    var injector;

    inject(function ($injector) {
      injector = $injector;
    });

    return injector;
  }
})
;

window.createMock = function ($provide, mockName, mockMethods) {
  var mock = jasmine.createSpyObj(mockName, mockMethods);

  $provide.value(mockName, mock);

  return mock;
};
