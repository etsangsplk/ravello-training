'use strict';

angular.module('trng.common.directives').directive('saveAndCancel', function() {
    return {
        restrict: 'EA',
        scope: {
            approveLabel: '@',
            cancelLabel: '@',
            approveFunc: '=',
            cancelFunc: '='
        },
        templateUrl: 'app/common/directives/save-and-cancel/save-and-cancel.html'
    };
});