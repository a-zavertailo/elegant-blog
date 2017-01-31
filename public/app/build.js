(function () {
    'use strict';

    angular.module('blogApp', [
        'ui.router'
    // 'ngCookies',
    // 'ngAnimate',
    ]);

})();

// (function () {
//     'use strict';
//
//     angular.module('blogApp').config([
//         '$rootScope',
//         function ($rootScope) {
//
//         }
//     ]);
//
// })();
//

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

(function () {
    'use strict';

    angular
        .module('blogApp')
        .run([
            '$rootScope',
            '$window',
            '$document',
            'getGlobalData',
            function ($rootScope, $window, $document, getGlobalData) {

                var screenTabletMin = 768; // bootstrap screen-sm-min
                var screenLaptopMin = 992; // bootstrap screen-md-min
                var screenDesktopMin = 1200; // bootstrap screen-lg-min

                $rootScope.globalData = {};

                loadGlobalData();

                $rootScope.screenType = ($window.innerWidth < screenTabletMin) ? 'mobile' :
                    ($window.innerWidth < screenLaptopMin) ? 'tablet' :
                        ($window.innerWidth < screenDesktopMin) ? 'laptop' : 'desktop';

                angular.element($window).bind('resize', function () {
                    var screenTypeNew = ($window.innerWidth < screenTabletMin) ? 'mobile' :
                        ($window.innerWidth < screenLaptopMin) ? 'tablet' :
                            ($window.innerWidth < screenDesktopMin) ? 'laptop' : 'desktop';
                    if (screenTypeNew !== $rootScope.screenType) {
                        $rootScope.screenType = screenTypeNew;
                        $rootScope.$digest();
                    }
                });

                $rootScope.isScreenMobile = function () {
                    return $rootScope.screenType === 'mobile';
                };

                $rootScope.isScreenTablet = function () {
                    return $rootScope.screenType === 'tablet';
                };

                $rootScope.isScreenLaptop = function () {
                    return $rootScope.screenType === 'laptop';
                };

                $rootScope.isScreenDesktop = function () {
                    return $rootScope.screenType === 'desktop';
                };


                // Set scroll at begin on reload
                $rootScope.$on('$stateChangeSuccess', function () {
                    $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
                });

                //////////

                function loadGlobalData() {

                    // getGlobalData.getGlobalData()
                    //     .then(function(data) {
                    //         $rootScope.globalData = {
                    //             categories: data.categories,
                    //             tags: data.tags,
                    //             popularPostsList: data.popularPostsList
                    //         };
                    //         console.log($rootScope.globalData);
                    //     })
                    //     .catch(function(err) {
                    //         console.error(err);
                    //     });

                    getGlobalData.getCategories()
                        .then(function(data) {
                            $rootScope.globalData.categories = data;
                        })
                        .catch(function(err) {
                            console.error(err);
                        });

                    getGlobalData.getTags()
                        .then(function(data) {
                            $rootScope.globalData.tags = data;
                        })
                        .catch(function(err) {
                            console.error(err);
                        });

                    getGlobalData.getPopularPosts()
                        .then(function(data) {
                            $rootScope.globalData.popularPostsList = data;
                        })
                        .catch(function(err) {
                            console.error(err);
                        });
                }

            }
        ]);

})();
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