var module = angular.module('writer.controllers');

module.controller('AppCtrl', function($scope) {
    $scope.metadata = {
        title: 'Start',
        description: 'Upplevelser och bilder från två backpackers på vift.',
        author: 'Axel Niklasson'
    }

    $scope.$on('newPageLoaded', function(event, metadata) {
        $scope.metadata = metadata;
    });
});