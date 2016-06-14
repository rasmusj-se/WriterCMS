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
    $scope.$on('$viewContentLoaded', function() {
        fetchPosts();
    });

    function fetchPosts() {
        PostService.getAllPosts().success(function(response) {
            $scope.posts = response;
            angular.forEach($scope.posts, function(post) {
                post.content = marked(post.content);
            });
        }).error(function(err) {
            $scope.posts = [];
            console.log(err);
        });
    }
});

module.controller('PostDetailCtrl', function($scope, $stateParams, PostService) {

    PostService.getPostByID($stateParams.id).success(function(response) {
        $scope.post = response;
        var metadata = {
            title: $scope.post.title,
            description: $scope.post.content,
            author: $scope.post.author.firstName + ' ' + $scope.post.author.lastName
        };

        if ($scope.post.images.length > 0) {
            metadata.image = 'https://' + document.domain + $scope.post.images[0];
        } else {
            metadata.image = null;
        }
        $scope.$emit('newPageLoaded', metadata);

        $scope.post.content = marked($scope.post.content);
    }).error(function(err) {
        $scope.post = {};
        console.log(err);
    });
});

module.controller('AdminPostDetailCtrl', function($scope, $state, $stateParams,
    ngDialog, CategoryService, PostService) {

    $scope.removePhoto = function(index) {
        $scope.post.images.splice(index, 1);
    }

    $scope.updatePost = function() {
        PostService.updatePost($scope.post).success(function(response) {
            ngDialog.open({ template: 'partials/popups/posts/postUpdatedSuccess.html', className: 'ngdialog-theme-default' });
        }).error(function(err) {
            console.log(err);
            ngDialog.open({ template: 'partials/popups/posts/postUpdatedError.html', className: 'ngdialog-theme-default' });
        })
    }

    $scope.deletePost = function() {
        PostService.deletePost($scope.post._id).success(function(response) {
            ngDialog.open({ template: 'partials/popups/posts/postDeletedSuccess.html', className: 'ngdialog-theme-default' });
            $state.go('base.admin.posts');
        }).error(function(err) {
            console.log(err);
            ngDialog.open({ template: 'partials/popups/posts/postDeletedError.html', className: 'ngdialog-theme-default' });
        })
    }

    CategoryService.getAllCategories().success(function(response) {
        $scope.categories = response;
    }).error(function(err) {
        console.log(err);
    });

    PostService.getPostByID($stateParams.id).success(function(response) {
        $scope.post = response;
        angular.forEach($scope.post.categories, function(category, index) {
            $scope.post.categories[index] = category._id;
        });
        console.log()
    }).error(function(err) {
        $scope.post = {};
        console.log(err);
    });
});

module.controller('NewPostCtrl', function($scope, $stateParams, $timeout, CategoryService, LocationService, PostService, ngDialog) {
    $scope.images = [];
    $scope.post = { categories: [] };

    LocationService.getCurrentLocation().then(function(location) {
        $scope.$apply($scope.post.location = location);
    }).catch(function(err) {
        console.log(err);
    });

    CategoryService.getAllCategories().success(function(response) {
        $scope.categories = response;
    }).error(function(err) {
        console.log(err);
    });

    $scope.removePhoto = function(index) {
        $scope.images.splice(index, 1);
    }

    $scope.renderImages = function(event) {
        if (event) {
            angular.forEach(event.target.files, function(file) {
                var reader = new FileReader();
                var img = new Image();

                reader.onload = function(e) {
                    $scope.$apply($scope.images.push(this.result));
                }

                reader.readAsDataURL(file);
            })
        }
    }

    $scope.submitPost = function() {
        var spinner = ngDialog.open({ template: 'partials/popups/spinner.html', className: 'ngdialog-theme-default' });
        var post = { title: $scope.post.title, content: $scope.post.content, images: $scope.images,
            author: localStorage.getItem('userID'), categories: $scope.post.categories, location: $scope.post.location };

        PostService.createPost(post).success(function(response) {
            $scope.post = {};
            $scope.images = [];
            spinner.close();
            ngDialog.open({ template: 'partials/popups/posts/postCreatedSuccess.html', className: 'ngdialog-theme-default' });
        }).error(function(err) {
            spinner.close();
            ngDialog.open({ template: 'partials/popups/posts/postCreatedError.html', className: 'ngdialog-theme-default' });
        });
    }
});
