define(
    ['ko', 'hammer', 'utils', 'mediator', 'globals', 'router', 'provider', 'ui', 'pages', 'ajx', 'resty'],

function(ko, hammer, utils, mediator, globals, router, provider, ui, pages, ajx, resty){
    'use strict';



    //init cover basic property and methods
    var kover = {
        Ui: ui,
        Utils: utils,
        Observe: ko.observable,
        ObserveArray: ko.observableArray,
        _currentPage: globals.getGlobals('_currentPage'),
        Resty: resty
    };

    //init custom bindingProvider
    ko.bindingProvider.instance = new provider.Main();

    //extend interfaces from mediator and pages module
    return utils.extend( utils.extend(kover, mediator), pages, ajx, globals, router );

});