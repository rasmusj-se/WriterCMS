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
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('base', {
            templateUrl: 'partials/base.html',
            controller: 'BaseCtrl',
            abstract: true
        })
        .state('base.home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
        })
});