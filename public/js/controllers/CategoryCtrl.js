var module = angular.module('writer.controllers');

module.controller('NewCategoryCtrl', function($scope, ngDialog, CategoryService) {
    $scope.createCategory = function() {
        var category = { name: $scope.category.name };

        CategoryService.createCategory(category).success(function(response) {
            $scope.category = {};
            Materialize.toast('Kategorin är skapad!', 2000);
            $('form label').removeClass('active');
        }).error(function(err) {
            Materialize.toast('Det gick inte att skapa kategorin.', 2000);
            console.log(err);
        });
    }
});

module.controller('AdminCategoriesCtrl', function($scope, CategoryService) {
    $scope.$on('$viewContentLoaded', function() {
        $scope.loading = true;
        fetchCategories();
    });

    function fetchCategories() {
        CategoryService.getAllCategories().success(function(response) {
            $scope.loading = false;
            $scope.categories = response;
        }).error(function(err) {
            $scope.loading = false;
            $scope.categories = [];
            console.log(err);
        });
    }
});

module.controller('AdminCategoryDetailCtrl', function($scope, $stateParams, $state, CategoryService, ngDialog) {
    $('.modal-trigger').leanModal();    
    $scope.loading = true;

    CategoryService.getCategoryByID($stateParams.id).success(function(response) {
        $scope.category = response;
        $scope.loading = false;
    }).error(function(err) {
        $scope.category = {};
        $scope.loading = false;
        console.log(err);
    });

    $scope.updateCategory = function() {
        CategoryService.updateCategory($scope.category).success(function(response) {
            Materialize.toast('Kategorin är uppdaterad!', 2000);
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Kategorin kunde inte uppdateras!', 2000);
        })
    }

    $scope.deleteCategory = function() {            
        CategoryService.deleteCategory($scope.category._id).success(function(response) {
            Materialize.toast('Kategorin är raderad!', 2000);
            $state.go('base.admin.categories');
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Kategorin kunde inte raderas!', 2000);
        })
    }
});
