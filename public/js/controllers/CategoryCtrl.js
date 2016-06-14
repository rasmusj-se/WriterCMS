var module = angular.module('writer.controllers');

module.controller('NewCategoryCtrl', function($scope, ngDialog, CategoryService) {
    $scope.createCategory = function() {
        var category = { name: $scope.category.name };
        CategoryService.createCategory(category).success(function(response) {
            $scope.category = {};
            ngDialog.open({ template: 'partials/popups/categories/categoryCreatedSuccess.html', className: 'ngdialog-theme-default' });
        }).error(function(err) {
            ngDialog.open({ template: 'partials/popups/categories/categoryCreatedError.html', className: 'ngdialog-theme-default' });
            console.log(err);
        });
    }
});

module.controller('AdminCategoriesCtrl', function($scope, CategoryService) {
    $scope.$on('$viewContentLoaded', function() {
        fetchCategories();
    });

    function fetchCategories() {
        CategoryService.getAllCategories().success(function(response) {
            $scope.categories = response;
        }).error(function(err) {
            $scope.categories = [];
            console.log(err);
        });
    }
});

module.controller('AdminCategoryDetailCtrl', function($scope, $stateParams, $state, CategoryService, ngDialog) {
    CategoryService.getCategoryByID($stateParams.id).success(function(response) {
        $scope.category = response;
    }).error(function(err) {
        $scope.category = {};
        console.log(err);
    });

    $scope.updateCategory = function() {
        CategoryService.updateCategory($scope.category).success(function(response) {
            ngDialog.open({ template: 'partials/popups/categories/categoryUpdatedSuccess.html', className: 'ngdialog-theme-default' });
        }).error(function(err) {
            console.log(err);
            ngDialog.open({ template: 'partials/popups/categories/categoryUpdatedError.html', className: 'ngdialog-theme-default' });
        })
    }

    $scope.deleteCategory = function() {
        CategoryService.deleteCategory($scope.category._id).success(function(response) {
            ngDialog.open({ template: 'partials/popups/categories/categoryDeletedSuccess.html', className: 'ngdialog-theme-default' });
            $state.go('base.admin.categories');
        }).error(function(err) {
            console.log(err);
            ngDialog.open({ template: 'partials/popups/categories/categoryDeletedError.html', className: 'ngdialog-theme-default' });
        })
    }
});
