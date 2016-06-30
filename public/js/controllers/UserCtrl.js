var module = angular.module('writer.controllers');

module.controller('AdminUsersCtrl', function($scope, UserService) {
    $scope.$on('$viewContentLoaded', function() {
        fetchUsers();
        $scope.loading = true;
    });

    function fetchUsers() {
        UserService.getAllUsers().success(function(response) {
            $scope.users = response;
            $scope.loading = false;
        }).error(function(err) {
            $scope.users = [];
            $scope.loading = false;
            console.log(err);
        });
    }
});

module.controller('AdminUsersDetailCtrl', function($scope, $state, $stateParams, UserService) {
    $('.modal-trigger').leanModal();
    $scope.loading = true;

    UserService.getUserByID($stateParams.id).success(function(response) {
        $scope.user = response;
        $scope.loading = false;
    }).error(function(err) {
        $scope.users = [];
        $scope.loading = false;
        console.log(err);
    });

    $scope.updateUser = function() {
        UserService.updateUser($scope.user).success(function(response) {
            Materialize.toast('Användaren är uppdaterad!', 3000);
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Användaren kunde inte uppdateras!', 3000);
        })
    }

    $scope.deleteUser = function() { 
        console.log('asd');           
        UserService.deleteUser($stateParams.id).success(function(response) {
            Materialize.toast('Användaren är raderad!', 3000);
            $state.go('base.admin.users');
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Användaren kunde inte raderas!', 3000);
        })
    }
});

module.controller('NewUserCtrl', function($scope, $stateParams, UserService) {
    $scope.createUser = function() {
        var user = { firstName: $scope.user.firstName, lastName: $scope.user.lastName,
            username: $scope.user.username, password: $scope.user.password1 };

        UserService.createUser(user).success(function(response) {
            $scope.user = {};
            Materialize.toast('Användaren är skapad!', 3000);
            $('form label').removeClass('active');
        }).error(function(err) {
            Materialize.toast('Det gick inte att skapa användaren.', 3000);
            console.log(err);
        });
    }
});