var module = angular.module('writer.services');

module.factory('DashboardService', function($http) {
    return {
        getStatus: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/status',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        },
        getLastPost: function() {
            var req = {
                method: 'GET',
                url: $http.defaults.base_url + '/status/lastpost',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            return $http(req);
        }
    }
});
