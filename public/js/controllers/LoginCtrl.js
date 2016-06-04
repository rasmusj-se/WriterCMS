var module = angular.module('writer.controllers');

module.controller('LoginCtrl', function($rootScope, $scope, $state, AuthService) {
    $scope.logIn = function() {
        var credentials = { username: $scope.username, password: $scope.password };
        AuthService.logIn(credentials).success(function(response) {
            localStorage.setItem('token', response.token);
            $rootScope.authenticated = true;
            $state.go('base.admin.dashboard');
        }).error(function(err) {
            console.log(err);
        });
    }
});