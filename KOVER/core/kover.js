
define(
    ['ko', 'hammer', 'utils', 'mediator', 'globals', 'provider', 'ui', 'pages', 'ajx', 'resty'],

function(ko, hammer, utils, mediator, globals, provider, ui, pages, ajx, resty){
    'use strict';

    var compile = function(name){
        if( document.getElementById(name, document.body) === null ){
            require(['render', '../../pages/'+name+'.View', '../../pages/'+name+'.VM'], function(render, page, VM){
                mediator.SyncFire('page:compile', [name, VM]);
            });
            return true;
        }else{
            this._currentPage(name);
            return false;
        }
    };

    var render = function(name) {
        mediator.Fire('page:render', [name]);
    };

    var goTo = function(name) {
        var green = compile.call(this, name);
        if(green) render(name);
    };

    //init cover basic property and methods
    var kover = {
        Ui: ui,
        Utils: utils,
        Observe: ko.observable,
        ObserveArray: ko.observableArray,
        GoTo: goTo,
        Render: render,
        Compile: compile,
        _currentPage: ko.observable(),
        Resty: resty
    };

    //init custom bindingProvider
    ko.bindingProvider.instance = new provider.Main();

    //extend interfaces from mediator and pages module
    return utils.extend( utils.extend(kover, mediator), pages, ajx, globals );

});