var module = angular.module('writer.controllers');

module.controller('AppCtrl', function($scope, AuthService) {
    $scope.settings = {
        site: {
            title: 'Writer'
        }
    };

    $scope.metadata = {
        title: $scope.settings.title,
        description: 'Upplevelser och bilder från två backpackers på vift.',
        author: 'Axel Niklasson',
        image: 'http://66.media.tumblr.com/3dbf290f6477026a098a8369e1d96665/tumblr_mj9jshtzH01qadknpo1_1280.jpg'
    }

    $scope.$on('newPageLoaded', function(event, metadata) {
        $scope.metadata = metadata;
    });

    $scope.logOut = function() {
        AuthService.logOut();
        location.reload();
        $state.go('base.posts');
    }
});
