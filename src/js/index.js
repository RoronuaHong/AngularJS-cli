import "../scss/index";
import "../scss/common/normalize";

const myApp = Angular.module("myApp", []);

const INTEGER_REGEXP = /^-?\d+$/;
myApp
.directive("integer", function() {
    return {
        require: "ngModel",
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.integer = function(modelValue, viewValue) {
                if(ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                if(INTERGER_REGRXP.test(viewValue)) {
                    return true;
                }

                return false;
            }
        }
    }
})
.directive("username", function($q, $timeout) {
    return {
        require: "ngModel",
        link: function(scope, elm, attrs, ctrl) {
            const usernames = ["Jim", "John", "Jill", "Jackie"];

            ctrl.$asyncValidators.username = function(modelValue, viewValue) {
                if(ctrl.$isEmpty(modelValue)) {
                    return $q.resolve();
                }
            }

            const def = $q.defer();

            $timeout(function() {
                if(usernames.indexOf(modelValue) === -1) {
                    def.resolve();
                } else {
                    def.reject();
                }
            }, 2000);

            return def.promise;
        }
    }
});