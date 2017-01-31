(function () {
    'use strict';

    angular.module('blogApp').controller("postCtrl", [
        '$sce',
        '$rootScope',
        'postResolve',
        function ($sce, $rootScope, postResolve) {

            var vm = this;

            vm.sce = $sce;

            vm.post = postResolve;
            vm.categories = $rootScope.globalData.categories;
            vm.tags = $rootScope.globalData.tags;
            vm.popularPostsList = $rootScope.globalData.popularPostsList;
        }
    ]);

})();