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
        }
    }
});