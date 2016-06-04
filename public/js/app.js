/* Angular init */
var writer = angular.module('writer', ['ui.router', 
    'writer.controllers', 'writer.services', 'writer.filters', 'writer.directives']);

/* Module setup */
angular.module('writer.controllers', []);
angular.module('writer.services', []);
angular.module('writer.filters', []);
angular.module('writer.directives', []);

/* Moment.js init */
moment.locale('sv');

/* Router setup */
writer.config(function($stateProvider, $urlRouterProvider) {
    /* Fallback URL */
    $urlRouterProvider.otherwise('/posts');

    $stateProvider
        .state('base', {
            templateUrl: 'partials/base.html',
            controller: 'BaseCtrl',
            abstract: true
        })
        .state('base.posts', {
            url: '/posts',
            templateUrl: 'partials/posts/posts.html',
            controller: 'PostCtrl',
        })
        .state('base.postdetail', {
            url: '/:id',
            templateUrl: 'partials/posts/posts-detail.html',
            controller: 'PostDetailCtrl'
        })
});