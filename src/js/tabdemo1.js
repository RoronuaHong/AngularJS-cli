import "../scss/index";
import "../scss/tabdemo1";
import "../scss/common/reset";

;(function(angular) {

    /*使用directive/ng-transclude/templateUrl完成tab切换*/
    const myApps = angular.module("myAppz", []);

    myApps
    .directive("myTabs", function() {
        return {
            restrict: "E",
            transclude: true,
            scope: {},
            controller: ["$scope", function($scope) {
                const items = $scope.items = [];

                $scope.select = function(item) {
                    angular.forEach(items, (itm) => {
                        itm.selected = false;
                    });

                    item.selected = true;
                }

                this.addItem = function(item) {
                    if(items.length === 0) {
                        $scope.select(item);
                    }

                    items.push(item);
                }
            }],
            templateUrl: "./my-tabs.html"
        }
    })
    .directive("myCon", function() {
        return {
            require: "^^myTabs",
            restrict: "E",
            transclude: true,
            scope: {
                name: "@"
            },
            link: function(scope, elem, attrs, ctrl) {
                ctrl.addItem(scope);
            },
            templateUrl: "./my-con.html"
        }
    });
})(Angular);