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
writer.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    /* API Base URL */
    $httpProvider.defaults.base_url = 'http://localhost:3000';

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
            url: '/posts/:id',
            templateUrl: 'partials/posts/posts-detail.html',
            controller: 'PostDetailCtrl'
        })
        .state('base.route', {
            url: '/route',
            templateUrl: 'partials/route.html'
        })
        .state('base.about', {
            url: '/about',
            templateUrl: 'partials/about.html',
            authenticate: true
        })
        /* Admin states */
        .state('base.admin', {
            url: '/admin',
            templateUrl: 'partials/admin/base.html',
            authenticate: true
        })
        .state('base.admin.login', {
            templateUrl: 'partials/admin/login.html',
            controller: 'LoginCtrl'
        })
        .state('base.admin.dashboard', {
            url: '/dashboard',
            templateUrl: 'partials/admin/dashboard.html',
            authenticate: true
        })
        .state('base.admin.posts', {
            url: '/posts',
            templateUrl: 'partials/admin/posts.html',
            authenticate: true
        })
        .state('base.admin.posts.new', {
            url: '/new',
            templateUrl: 'partials/admin/posts-new.html',
            authenticate: true
        })
        .state('base.admin.users', {
            url: '/users',
            templateUrl: 'partials/admin/users.html',
            authenticate: true
        })
        .state('base.admin.users.new', {
            url: '/new',
            templateUrl: 'partials/admin/users-new.html',
            authenticate: true
        })
        .state('base.admin.settings', {
            url: '/settings',
            templateUrl: 'partials/admin/settings.html',
            authenticate: true
        })
});

/* Adding authentication */
writer.run(function ($rootScope, $state, AuthService) {
    $rootScope.authenticated = AuthService.isAuthenticated();

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && !AuthService.isAuthenticated()) {
            $state.transitionTo('base.admin.login');
            event.preventDefault(); 
        }
    });
    $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
        if (toState.name === 'base.admin') {
            $state.go('base.admin.dashboard');
        }  
    });
});