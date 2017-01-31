(function () {
    'use strict';

    angular.module('blogApp').directive('menuSwitchBtn', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'EA',
                scope: {
                    title: '@',
                    titleHideTime: '@',
                    titleShowDelay: '@',
                    transformDelay: '@',
                    transformTime: '@',
                    menuState: '='
                },
                replace: true,
                template:
                    '<div class="menu-switcher menu-open" data-ng-class="{\'menu-open\': !menuState.opened, \'menu-close\': menuState.opened}">' +
                        '<div class="line-top"></div>' +
                        '<div class="line-middle"></div>' +
                        '<div class="line-bottom"></div>' +
                        '<div class="title">{{title}}</div>' +
                    '</div>',
                link: function (scope, element, attr) {

                }
            }
        }
    ]);

})();



// scope.$watch(scope.showElemOnIf, function(value) {
//
//     if (value) {
//         element.css({
//             opacity : '0',
//             display: 'block'
//         });
//
//         $timeout(function() {
//             element.css({
//                 transition: scope.appearDelay + 'ms',
//                 opacity : '1'
//             });
//         }, scope.showDelay);
//
//         $timeout(function() {
//             element.css({
//                 opacity : '0'
//             });
//         }, +scope.showDuration + +scope.showDelay);
//
//         $timeout(function() {
//             element.css({
//                 transition: 'none',
//                 display: 'none'
//             });
//         }, +scope.showDuration + +scope.showDelay + +scope.appearDelay);
//     }
// });