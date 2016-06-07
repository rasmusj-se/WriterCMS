var module = angular.module('writer.controllers');

module.controller('LoginCtrl', function($rootScope, $scope, $state, AuthService, ngDialog) {
    $scope.logIn = function() {
        var credentials = { username: $scope.username, password: $scope.password };
        AuthService.logIn(credentials).success(function(response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userID', response.userID);
            $rootScope.authenticated = true;
            $state.go('base.admin.dashboard');
        }).error(function(err) {
            switch (err.message) {
                case 'USER_NOT_FOUND':
                    ngDialog.open({ template: 'partials/popups/userNotFound.html', className: 'ngdialog-theme-default' });
                    break;

                case 'LOGIN_INVALID':
                    ngDialog.open({ template: 'partials/popups/invalidLogin.html', className: 'ngdialog-theme-default' });
                    break;

                default:
                    ngDialog.open({ template: 'partials/popups/error.html', className: 'ngdialog-theme-default' });
                    break;
            }
        });
    }
});