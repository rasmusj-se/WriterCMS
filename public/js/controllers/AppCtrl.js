var module = angular.module('writer.controllers');

module.controller('AppCtrl', function($scope) {
    $scope.metadata = {
        title: 'Asien 2017',
        description: 'Upplevelser och bilder från två backpackers på vift.',
        author: 'Axel Niklasson'
    }

    $scope.$on('newPageLoaded', function(event, metadata) {
        $scope.metadata = metadata;
    });
});