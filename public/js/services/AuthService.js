var module = angular.module('writer.services');

module.factory('AuthService', function($http, $rootScope) {
    return {
        isAuthenticated: function() {
            return !(localStorage.getItem('token') === null);
        },
        logIn: function(username, password) {
            localStorage.setItem('token', '98a7syd98agsd98ygas7dyfg');
            $rootScope.authenticated = true;
        },
        logOut: function() {
            localStorage.removeItem('token');
            $rootScope.authenticated = false;
        }
    }
});