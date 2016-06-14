var module = angular.module('writer.controllers');

module.controller('DashboardCtrl', function($scope, DashboardService) {
    $scope.status = {
        posts: 0,
        categories: 0,
        comments: 0,
        views: 0
    };

    DashboardService.getStatus().success(function(response) {
        $scope.status = response;
    }).error(function(err) {
        console.log(err);
    });

    DashboardService.getLastPost().success(function(response) {
        $scope.lastPost = response[0];
    }).error(function(err) {
        console.log(err);
    });
});
