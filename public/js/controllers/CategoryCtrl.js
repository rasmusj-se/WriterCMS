var module = angular.module('writer.controllers');

module.controller('NewCategoryCtrl', function($scope, ngDialog, CategoryService) {
    $scope.createCategory = function() {
        var category = { name: $scope.category.name };

        CategoryService.createCategory(category).success(function(response) {
            $scope.category = {};
            Materialize.toast('Kategorin är skapad!', 3000);
            $('form label').removeClass('active');
        }).error(function(err) {
            Materialize.toast('Det gick inte att skapa kategorin.', 3000);
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
            Materialize.toast('Kategorin är uppdaterad!', 3000);
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Kategorin kunde inte uppdateras!', 3000);
        })
    }

    $scope.deleteCategory = function() {
        // var $toastContent = $('<span class="toast">Vill du verkligen radera kategorin?<a class="confirm warning" onClick=confirmDelete()>OK</a></span>');
        // Materialize.toast($toastContent, 3000);

            
        CategoryService.deleteCategory($scope.category._id).success(function(response) {
            Materialize.toast('Kategorin är raderad!', 3000);
            $state.go('base.admin.categories');
        }).error(function(err) {
            console.log(err);
            Materialize.toast('Kategorin kunde inte raderas!', 3000);
        })
        
    }
});
