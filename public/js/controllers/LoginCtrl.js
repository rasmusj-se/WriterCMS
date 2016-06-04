var module = angular.module('writer.controllers');

module.controller('LoginCtrl', function($scope, $state, AuthService) {
    $scope.logIn = function() {
        AuthService.logIn();
        $state.go('base.admin.dashboard');
    }
});