var module = angular.module('writer.services');

module.factory('AuthService', function($http, $rootScope) {
    return {
        isAuthenticated: function() {
            return true;
        },
        logIn: function(username, password) {
            $rootScope.authenticated = true;
        },
        logOut: function() {
            $rootScope.authenticated = false;
        }
    }
});