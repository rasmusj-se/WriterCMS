var module = angular.module('writer.services');

module.factory('CommentService', function($http) {
    return {
        submitComment: function(comment) {
            var req = {
                method: 'POST',
                url: $http.defaults.base_url + '/comments',
                data: comment,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(req);
            return $http(req);
        }
    }
});