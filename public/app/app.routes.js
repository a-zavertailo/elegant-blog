//
//
//
(function () {
    'use strict';

    angular
        .module('blogApp')
        .config([
            '$stateProvider',
            '$locationProvider',
            '$urlRouterProvider',
            function ($stateProvider, $locationProvider, $urlRouterProvider) {

                var states = [
                    {
                        name: 'index',
                        url: '/',
                        templateUrl: './app/components/postsList/postsList.html',
                        controller: 'postsListCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            postsListResolve: [
                                'getPosts',
                                function(getPosts) {
                                    console.log('route /');
                                    return getPosts.getPostsAll();
                                }
                            ]
                        }
                    },
                    {
                        name: 'category',
                        url: '/category/:id',
                        templateUrl: './app/components/postsList/postsList.html',
                        controller: 'postsListCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            postsListResolve: [
                                '$stateParams',
                                'getPosts',
                                function($stateParams, getPosts) {
                                    console.log('route /category/' + $stateParams.id);
                                    return getPosts.getPostsByCategory($stateParams.id);
                                }
                            ]
                        }
                    },
                    {
                        name: 'tag',
                        url: '/tag/:id',
                        templateUrl: './app/components/postsList/postsList.html',
                        controller: 'postsListCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            postsListResolve: [
                                '$stateParams',
                                'getPosts',
                                function($stateParams, getPosts) {
                                    console.log('route /tag/' + $stateParams.id);
                                    return getPosts.getPostsByTag($stateParams.id);
                                }
                            ]
                        }
                    },
                    {
                        name: 'post',
                        url: '/post/:id',
                        templateUrl: './app/components/post/post.html',
                        controller: 'postCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            postResolve: [
                                '$stateParams',
                                'getPosts',
                                function($stateParams, getPosts) {
                                    console.log('route /post/' + $stateParams.id);
                                    return getPosts.getPostById($stateParams.id);
                                }
                            ]
                        }
                    },
                    {
                        name: 'about',
                        url: '/about',
                        templateUrl: './app/components/about/about.html'
                    }

                ];


                // Loop over the state definitions and register them
                states.forEach(function(state) {
                    $stateProvider.state(state);
                });

                // Default route
                $urlRouterProvider.otherwise("/");

                // Set hashbang prefix
                $locationProvider.hashPrefix('');

            }
        ]);

})();
