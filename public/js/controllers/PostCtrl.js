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

module.controller('NewPostCtrl', function($scope, $stateParams, $timeout, PostService, ngDialog) {
    $scope.images = [];

    $scope.renderImages = function(event) {
        if (event) {
            angular.forEach(event.target.files, function(file) {
                var reader = new FileReader();

                reader.addEventListener('load', function() {
                    $scope.$apply($scope.images.push(this.result));
                }, false);

                reader.readAsDataURL(file);
            })
        }
    }

    $scope.submitPost = function() {
        var post = { content: $scope.post.content, images: $scope.images, 
            author: localStorage.getItem('userID') };
        PostService.createPost(post).success(function(response) {
            $scope.post = {};
            $scope.images = [];
            ngDialog.open({ template: 'partials/popups/postCreatedSuccess.html', className: 'ngdialog-theme-default' });
        }).error(function(err) {
            ngDialog.open({ template: 'partials/popups/postCreatedError.html', className: 'ngdialog-theme-default' });
        });
    }
});