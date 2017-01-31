(function () {
    'use strict';

    angular.module('blogApp').controller("mainCtrl", [
        '$scope',
        '$rootScope',
        function ($scope, $rootScope) {

            var vm = this;

            vm.categories = $rootScope.globalData.categories;
            vm.tags = $rootScope.globalData.tags;
            vm.popularPostsList = $rootScope.globalData.popularPostsList;

            console.log('data: ');
            console.log(vm.categories);


            //
            // Slideout menu
            //
            var slideoutMenuWidth = 250;

            vm.slideout = new Slideout({
                'panel': document.getElementById('panel'),
                'menu': document.getElementById('menu'),
                'padding': slideoutMenuWidth,
                'tolerance': 70,
                'side': 'right'
            });

            vm.menuState = {opened: false};

            vm.slideout.on('beforeopen', function() {
                console.log('beforeopen');
                if (!vm.menuState.opened) {
                    $scope.$apply(vm.menuState.opened = true);
                }
            });

            vm.slideout.on('beforeclose', function() {
                console.log('beforeclose');
                if (vm.menuState.opened) {
                    $scope.$apply(vm.menuState.opened = false);
                }
            });

        }]);

})();