import "../scss/index";
import "../scss/common/normalize";

const myApp = Angular.module("myApps", []);

myApp
.directive("myTabs", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: {},
        controller: ["$scope", function MyTabController($scope) {
            const panes = $scope.panes = [];

            $scope.select = function(pane) {
                Angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });

                pane.selected = true;
            }

            this.addPane = function(pane) {
                if(panes.length === 0) {
                    $scope.select(pane);
                }

                panes.push(pane);
            }
        }],
        templateUrl: "./template/my-tabs.html"
    }
})
.directive("myPane", function() {
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
        templateUrl: "./template/my-pane.html"
    }
});
