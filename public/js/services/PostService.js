var module = angular.module('writer.services');

module.factory('PostService', function($http) {
    return {
        getAllPosts: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/posts',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getPostByID: function(ID) {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/posts/' + ID,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        createPost: function(post) {
            var req = {
                method: 'POST',
                url: $http.defaults.base_url + '/posts',
                data: post,
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        updatePost: function(post) {
            var req = {
                method: 'PUT',
                url: $http.defaults.base_url + '/posts/' + post.ID,
                data: post,
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        deletePost: function(ID) {
            var req = {
                method: 'DELETE',
                url: $http.defaults.base_url + '/posts/' + ID,
                headers: {
                    'Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
    }
});