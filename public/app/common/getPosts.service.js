(function () {
    'use strict';

    angular.module('blogApp').factory('getPosts', function($http) {
        var service = {
            getPostsAll: function() {
                return $http.get('./assets/data/posts.json', { cache: true })
                    .then(function(resp) {
                        return resp.data;
                    });
            },

            getPostsByCategory: function(id) {
                return service.getPostsAll()
                    .then(function (posts) {
                        return posts.filter(function(item) {
                            return item.category === id;
                        })
                    });
            },

            getPostsByTag: function(id) {
                return service.getPostsAll()
                    .then(function (posts) {
                        return posts.filter(function(item) {
                            return item.tags.indexOf(id) !== -1;
                        })
                    });
            },

            getPostById: function(id) {
                return service.getPostsAll()
                    .then(function (posts) {
                        return posts.filter(function(item) {
                            return item.id === +id;
                        })[0];
                    });
            }

        };

        return service;
    });

})();
