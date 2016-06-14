var module = angular.module('writer.filters');

module.filter('prettyDate', function() {
    return function(dateString) {
        return moment(dateString).format('LLLL');
    }
});

module.filter('timeSince', function() {
    return function(dateString) {
        return moment(dateString).toNow(true);
    }
});
