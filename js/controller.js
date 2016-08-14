(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {
        $scope.z = 0;
        $scope.sum = function() {
            $scope.z = $scope.x + $scope.y;
        };
    }
})();
