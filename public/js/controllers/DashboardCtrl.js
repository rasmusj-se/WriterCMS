var module = angular.module('writer.controllers');

module.controller('DashboardCtrl', function($scope, DashboardService) {
    $scope.loading = true;

    DashboardService.getStatus().success(function(response) {
        $scope.status = response;
        $scope.loading = false;
    }).error(function(err) {
        console.log(err);
        $scope.loading = false;
    });

    DashboardService.getLastPost().success(function(response) {
        $scope.lastPost = response[0];
    }).error(function(err) {
        console.log(err);
    });

    DashboardService.getStats().success(function(response) {
        $scope.stats = response;
    }).error(function(err) {
        console.log(err);
    });
});
