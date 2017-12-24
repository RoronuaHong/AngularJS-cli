;(function(angular) {
    const heroApp = angular.module("heroApp", []);

    heroApp
    .controller("MainCtrl", function MainCtrl() {
        this.hero = {
            name: "Spawn"
        }
    })
    .component("heroDetail", {
        templateUrl: "./heroDetail.html",
        bindings: {
            hero: "="
        }
    });

})(Angular);