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
            controller: ["$scope", function MyTabController($scope) {
                const items = $scope.items = [];

                $scope.select = function(item) {
                    angular.forEach(items, (tem) => {
                        tem.selected = false;
                    });
                    
                    item.selected = true;
                }

                this.addPane = function(pane) {
                    if(items.length === 0) {
                        $scope.select(pane);
                    }

                    items.push(pane);
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
                title: "@"
            },
            link: function(scope, elm, attrs, ctrl) {
                ctrl.addPane(scope);
            },
            templateUrl: "./my-con.html"
        }
    });
})(Angular);