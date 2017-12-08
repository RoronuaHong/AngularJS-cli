import "../scss/index";
import "../scss/common/normalize";

const myApp = Angular.module("myApp", []);

myApp
.filter("decorate", ["decoration", function(decoration) {
    function decorateFilter(input) {
        return decoration.symbol + input + decoration.symbol;
    }

    decorateFilter.$stateful = true;

    return decorateFilter;
}])
.controller("MyController", ["$scope", "decoration", function($scope, decoration) {
    $scope.greeting = "hello";
    $scope.decoration = decoration;
}])
.value("decoration", {
    symbol: "*"
});