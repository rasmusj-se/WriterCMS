var module = angular.module('writer.controllers');

module.controller('AppCtrl', function($scope) {
    $scope.settings = {
        site: {
            title: 'Asien 2017'
        }
    };

    $scope.metadata = {
        title: $scope.settings.title,
        description: 'Upplevelser och bilder från två backpackers på vift.',
        author: 'Axel Niklasson'
    }

    $scope.$on('newPageLoaded', function(event, metadata) {
        $scope.metadata = metadata;
    });
});
