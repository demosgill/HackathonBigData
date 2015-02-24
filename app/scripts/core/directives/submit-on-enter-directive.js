'use strict';

var app = angular.module('app');

app.directive('sxSubmitOnEnter', function () {
    return {
        require: 'form',
        scope: {
            sumbitForm: '&ngSubmit'
        },
        link: function (scope, iElement, iAttributes, FormController) {
            iElement.on('keypress', function (event) {
                var controlIsInput = 'input' === event.target.tagName.toLowerCase(),
                    keyIsEnter = event.which === 13;

                if (controlIsInput && keyIsEnter && FormController.$valid) {
                    scope.sumbitForm();
                }
            });
        }
    };
});
