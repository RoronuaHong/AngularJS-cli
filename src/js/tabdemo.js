import "../scss/common/reset.css";
import "../scss/tabdemo.scss";


;(function() {
    const myapp = Angular.module("myApp", []);

    myapp.controller("tabCtrl", ["$scope", function($scope) {
        $scope.data = {
            current: 1
        }

        $scope.actions = {
            setCurrent(index) {
                this.data = index;
            }
        }
    }]);
})();
