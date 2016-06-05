var module = angular.module('writer.controllers');

module.controller('PostCtrl', function($scope, PostService) {
    PostService.getAllPosts().success(function(response) {
        $scope.posts = response;
    }).error(function(err) {
        $scope.posts = [];
        console.log(err);
    });
});

module.controller('PostDetailCtrl', function($scope, $stateParams, PostService) {
    PostService.getPostByID($stateParams.id).success(function(response) {
        $scope.post = response;
    }).error(function(err) {
        $scope.post = {};
        console.log(err);
    });
});

module.controller('NewPostCtrl', function($scope, $stateParams, PostService, ngDialog) {
    $scope.submitPost = function() {
        var post = { content: $scope.post.content };
        PostService.createPost(post).success(function(response) {
            $scope.post = {};
            ngDialog.open({ template: 'partials/popups/postCreatedSuccess.html', className: 'ngdialog-theme-default' });
        }).error(function(err) {
            ngDialog.open({ template: 'partials/popups/postCreatedError.html', className: 'ngdialog-theme-default' });
        });
    }
});