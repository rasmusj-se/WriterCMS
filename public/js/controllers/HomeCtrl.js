var module = angular.module('writer.controllers');

module.controller('HomeCtrl', function($scope, PostService) {
    PostService.getAllPosts().success(function(response) {
        $scope.posts = response;
    }).error(function(err) {
        $scope.posts = [];
        console.log(err);
    });
});