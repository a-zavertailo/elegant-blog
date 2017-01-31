(function () {
    'use strict';

    angular
        .module('blogApp')
        .factory('getGlobalData', getGlobalData);

    getGlobalData.$inject = ['$http', '$q'];

    function getGlobalData($http, $q) {

        var service = {

            getCategories: function() {
                return $http.get('./assets/data/categories.json', {cache: true})
                    .then(function (res) {
                        return res.data;
                    })
            },

            getTags: function() {
                return $http.get('./assets/data/tags.json', {cache: true})
                    .then(function (res) {
                        return res.data;
                    });
            },

            getPopularPosts: function() {
                return $http.get('./assets/data/popularPosts.json', {cache: true})
                    .then(function (res) {
                        return res.data;
                    });
            },

            getGlobalData: function() {
                return $q.all([
                    service.getCategories(),
                    service.getTags(),
                    service.getPopularPosts()
                ]).then(function(dataArr) {
                    return {
                        categories: dataArr[0],
                        tags: dataArr[1],
                        popularPostsList: dataArr[2]
                    }
                });
            }

        };

        return service;
    }


})();
