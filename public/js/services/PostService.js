var module = angular.module('writer.services');

module.factory('PostService', function($http) {
    return {
        getAllPosts: function() {
            var req = {
                method: 'GET',
                url: 'http://localhost:3000/posts',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getPostByID: function(ID) {
            var req = {
                method: 'GET',
                url: 'http://localhost:3000/posts/' + ID,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        }
    }
});