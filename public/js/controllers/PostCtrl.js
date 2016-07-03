var module = angular.module('writer.controllers');

module.controller('PostCtrl', function($scope, $timeout, PostService) {
    $scope.loading = true;
    $scope.editing = false;

    PostService.getAllPosts().success(function(response) {
        $scope.posts = response;
        $scope.loading = false;
    }).error(function(err) {
        $scope.posts = [];
        $scope.loading = false;
        console.log(err);
    });

    $scope.showEditFields = function() {
        $scope.editing = true;
        $('#postContent').trigger('autoresize');
    }

    $scope.hideEditFields = function() {
        $scope.editing = false;
    }

    $scope.updatePost = function(post) {
        PostService.updatePost(post).success(function(response) {
            Materialize.toast('Inlägget är uppdaterat!', 2000);
            $scope.editing = false;
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Inlägget kunde inte uppdateras!', 2000);
        });
    }
});

module.controller('AdminPostCtrl', function($scope, PostService) {
    $scope.$on('$viewContentLoaded', function() {
        $scope.loading = true;
        fetchPosts();
    });

    function fetchPosts() {
        PostService.getAllPosts().success(function(response) {
            $scope.posts = response;
            $scope.loading = false;
        }).error(function(err) {
            $scope.posts = [];
            $scope.loading = false;
            console.log(err);
        });
    }
});

module.controller('PostDetailCtrl', function($scope, $stateParams, PostService) {
    $scope.loading = true;
    $scope.editing = false;

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
        $scope.loading = false;
    }).error(function(err) {
        $scope.post = {};
        $scope.loading = false;
        console.log(err);
    });

    $scope.showEditFields = function() {
        $scope.editing = true;
        $('#postContent').trigger('autoresize');
    }

    $scope.hideEditFields = function() {
        $scope.editing = false;
    }

    $scope.updatePost = function(post) {
        PostService.updatePost(post).success(function(response) {
            Materialize.toast('Inlägget är uppdaterat!', 2000);
            $scope.editing = false;
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Inlägget kunde inte uppdateras!', 2000);
        });
    }
});

module.controller('AdminPostDetailCtrl', function($scope, $state, $stateParams, CategoryService, PostService) {
    $scope.loading = true;

    $('.modal-trigger').leanModal();
    $('ul.tabs').tabs();

    $scope.removePhoto = function(index) {
        $scope.post.images.splice(index, 1);
    }

    $scope.updatePost = function() {
        $('#updatePostModal').openModal();
        $scope.uploadingPost = true;
        PostService.updatePost($scope.post).success(function(response) {
            $scope.uploadingPost = false;
            $scope.updateSuccess = true;
        }).error(function(err) {
            console.log(err);
            $scope.uploadingPost = false;
            $scope.updateSuccess = false;
            Materialize.toast('Inlägget kunde inte uppdateras!', 2000);
        });
    }

    $scope.deletePost = function() {
        PostService.deletePost($scope.post._id).success(function(response) {
            Materialize.toast('Inlägget är raderat!', 2000);
            $state.go('base.admin.posts');
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Inlägget kunde inte raderas!', 2000);
        });
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
        $scope.loading = false;
    }).error(function(err) {
        $scope.post = {};
        $scope.loading = false;
        console.log(err);
    });
});

module.controller('NewPostCtrl', function($scope, $stateParams, $timeout, CategoryService, LocationService, PostService) {
    $scope.images = [];
    $scope.post = { categories: [] };

    $('ul.tabs').tabs();
    $('.modal-trigger').leanModal();
    
    LocationService.getCurrentLocation().then(function(location) {
        var geocoder = new google.maps.Geocoder;
        var latLng = {
            lat: location.latitude,
            lng: location.longitude
        }

        geocoder.geocode({'location': latLng}, function(results, status) {
            $scope.$apply($scope.nearbyPlaces = results);
            $scope.$apply($scope.post.location = $scope.nearbyPlaces[0].place_id);
        });

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
        $scope.uploadingPost = true;
        $('#createPostModal').openModal();
        var post = { title: $scope.post.title, content: $scope.post.content, images: $scope.images,
            author: localStorage.getItem('userID'), categories: $scope.post.categories };

        if ($scope.post.location != null) {
            for (var i = 0; i < $scope.nearbyPlaces.length; i++) {
                var place = $scope.nearbyPlaces[i];
                if (place.place_id == $scope.post.location) {
                    post.location = place;
                    break;
                }
            }
        }

        PostService.createPost(post).success(function(response) {
            $scope.post = {};
            $scope.images = [];
            $scope.uploadingPost = false;
        }).error(function(err) {
            console.log(err);
            $scope.uploadingPost = false;
        });
    }
});
