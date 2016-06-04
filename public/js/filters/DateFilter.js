var module = angular.module('writer.filters');

module.filter('prettyDate', function() {
    return function(dateString) {
        return moment(dateString).calendar();
    }
});