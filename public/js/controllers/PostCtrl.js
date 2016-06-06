var module = angular.module('writer.controllers');

module.controller('PostCtrl', function($scope, PostService) {
    PostService.getAllPosts().success(function(response) {
        $scope.posts = response;
        angular.forEach($scope.posts, function(post) {
            post.content = marked(post.content);
        });
    }).error(function(err) {
        $scope.posts = [];
        console.log(err);
    });
});

module.controller('AdminPostCtrl', function($scope, PostService) {
    PostService.getAllPosts().success(function(response) {
        $scope.posts = response;
        angular.forEach($scope.posts, function(post) {
            post.content = marked(post.content);
        });
    }).error(function(err) {
        $scope.posts = [];
        console.log(err);
    });
});

module.controller('PostDetailCtrl', function($scope, $stateParams, PostService) {
    PostService.getPostByID($stateParams.id).success(function(response) {
        $scope.post = response;
        $scope.post.content = marked($scope.post.content);
    }).error(function(err) {
        $scope.post = {};
        console.log(err);
    });
});

module.controller('AdminPostDetailCtrl', function($scope, $state, $stateParams, 
    ngDialog, CategoryService, PostService) {
    $scope.editing = false;

    $scope.toggleEdit = function() {
        if ($scope.editing) {
            var post = { ID: $scope.post._id, title: $scope.post.title, content: $scope.post.content, categories: $scope.post.categories };
            PostService.updatePost(post).success(function(response) {
                ngDialog.open({ template: 'partials/popups/postUpdatedSuccess.html', className: 'ngdialog-theme-default' });
            }).error(function(err) {
                console.log(err);
                ngDialog.open({ template: 'partials/popups/postUpdatedError.html', className: 'ngdialog-theme-default' });
            })
        }
        $scope.editing = !$scope.editing;
    }

    $scope.deletePost = function() {
        PostService.deletePost($scope.post._id).success(function(response) {
            ngDialog.open({ template: 'partials/popups/postDeletedSuccess.html', className: 'ngdialog-theme-default' });
            $state.go('base.admin.posts');
        }).error(function(err) {
            console.log(err);
            ngDialog.open({ template: 'partials/popups/postDeletedError.html', className: 'ngdialog-theme-default' });
        })
    }

    CategoryService.getAllCategories().success(function(response) {
        $scope.categories = response;
    }).error(function(err) {
        console.log(err);
    });

    PostService.getPostByID($stateParams.id).success(function(response) {
        $scope.post = response;
    }).error(function(err) {
        $scope.post = {};
        console.log(err);
    });
});

module.controller('NewPostCtrl', function($scope, $stateParams, $timeout, CategoryService, PostService, ngDialog) {
    $scope.images = [];
    $scope.post = { categories: [] };

    CategoryService.getAllCategories().success(function(response) {
        $scope.categories = response;
    }).error(function(err) {
        console.log(err);
    });

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
        var post = { title: $scope.post.title, content: $scope.post.content, images: $scope.images, 
            author: localStorage.getItem('userID'), categories: $scope.post.categories };
        PostService.createPost(post).success(function(response) {
            $scope.post = {};
            $scope.images = [];
            ngDialog.open({ template: 'partials/popups/postCreatedSuccess.html', className: 'ngdialog-theme-default' });
        }).error(function(err) {
            ngDialog.open({ template: 'partials/popups/postCreatedError.html', className: 'ngdialog-theme-default' });
        });
    }
});