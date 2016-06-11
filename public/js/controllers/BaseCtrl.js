var module = angular.module('writer.controllers');

module.controller('BaseCtrl', function($scope, $state, AuthService) {

    $scope.logOut = function() {
        AuthService.logOut();
        location.reload();
        $state.go('base.posts');
    }
});