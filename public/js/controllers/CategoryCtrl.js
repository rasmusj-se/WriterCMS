var module = angular.module('writer.controllers');

module.controller('NewCategoryCtrl', function($scope, ngDialog, CategoryService) {
    $scope.createCategory = function() {
        var category = { name: $scope.category.name };
        CategoryService.createCategory(category).success(function(response) {
            $scope.category = {};
            ngDialog.open({ template: 'partials/popups/categoryCreatedSuccess.html', className: 'ngdialog-theme-default' });
        }).error(function(err) {
            ngDialog.open({ template: 'partials/popups/categoryCreatedError.html', className: 'ngdialog-theme-default' });
            console.log(err);
        });
    }
});