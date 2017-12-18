import "../scss/index";
import "../scss/tabdemo1";
import "../scss/common/reset";

;(function(angular) {

    /*使用普通方法实现tab切换*/
    const myApp = angular.module("myAppz", []);

    myApp
    .controller("Controller", ["$scope", function($scope) {
        $scope.items = {
            selected: 1
        }

        $scope.select = function(item) {
            console.log(item);
        }
    }]);
})(Angular);