import "../scss/index";
import "../scss/common/normalize";

const myApp = Angular.module("heroApp", []);

myApp
.component("heroList", {
    templateUrl: "./heroList.html",
    controller: HeroListController
})
.component("heroDetail", {
    templateUrl: "./heroDetail.html",
    controller: HeroDetailController,
    bindings: {
        hero: "<",
        onDelete: "&",
        onUpdate: "&"
    }
})
.component("editableField", {
    templateUrl: "./editableField.html",
    controller: editableFieldController,
    bindings: {
        fieldValue: "<",
        fieldType: "@?",
        onUpdate: "&"
    }
});

function HeroListController($scope, $element, $attrs) {
    const ctrl = this;

    ctrl.list = [
        {
            name: "Superman",
            location: ""
        },
        {
            name: "Batman",
            location: ""
        }
    ];

    ctrl.updateHero = function(hero, prop, value) {
        hero[prop] = value;
    }

    ctrl.deleteHero = function(hero) {
        const idx = ctrl.list.indexOf(hero);

        if(idx >= 0) {
            ctrl.list.splice(idx, 1);
        }
    }
}

function HeroDetailController() {
    const ctrl = this;

    ctrl.delete = function() {
        ctrl.onDelete({
            hero: ctrl.hero
        });
    }

    ctrl.update = function(prop, value) {
        ctrl.onUpdate({
            hero: ctrl.hero,
            prop: prop,
            value: value
        });
    }
}

function editableFieldController($scope, $element, $attrs) {
    const ctrl = this;
    ctrl.editMode = false;

    ctrl.handleModeChange = function() {
        if(ctrl.editMode) {
            ctrl.onUpdate({
                value: ctrl.fieldValue
            });

            ctrl.fieldValueCopy = ctrl.fieldValue;
        }

        ctrl.editMode = !ctrl.editMode;
    }

    ctrl.reset = function() {
        ctrl.fieldValue = ctrl.fieldValueCopy;
    }

    ctrl.$onInit = function() {
        ctrl.fieldValueCopy = ctrl.fieldValue;

        if(!ctrl.fieldType) {
            ctrl.fieldType = "text";
        }
    }
}