(function () {
    'use strict';

    angular.module('blogApp').controller("postsListCtrl", [
        '$sce',
        '$rootScope',
        'postsListResolve',
        function ($sce, $rootScope, postsListResolve) {

            var vm = this;

            vm.sce = $sce;
            vm.postsList = postsListResolve;
            vm.categories = $rootScope.globalData.categories;
            vm.tags = $rootScope.globalData.tags;
            vm.popularPostsList = $rootScope.globalData.popularPostsList;

        }
    ]);

})();