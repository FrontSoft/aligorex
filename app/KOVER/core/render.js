define(function(){
    'use strict';

    var KOVER = require('kover'),
        ko = require('ko'),
        binds = {};

    /**
     * render single page object: build dom tree and binds
     * @param {string} name
     */
    function compilePage(name, VM){
        var page = KOVER.GetPage(name);
        KOVER.Utils.extend(page.viewModel, VM);
        binds = {};
        recurciveBuilder.call(page.viewModel, page.viewObject, page.body, null);
        KOVER.SyncFire('bindClass:addBind', [name, binds]);
    }

    /**
     * recursive function for invoke page object
     * @param {object} obj
     * @param {dom} node
     * @param {string} bindName
     */
    function recurciveBuilder(obj, node, bindName){
        var child = node;
        if(bindName){
            child = KOVER.Utils.has(obj, 'DOM') ? node.appendChild( obj.DOM ) : node;
            child.setAttribute('kr', bindName);

            KOVER.Utils.has(obj, 'BIND') ? binds[bindName] = obj.BIND : '';
        }

        KOVER.Utils.each(obj, function(value, key){
            if( value instanceof KOVER.Ui ){
                recurciveBuilder.call(this, value, child, key);
            }
        }, this);
    }


    /**
     * applyBindings to node and append to body
     * @param {string} name
     */
    function renderPage(name){
        name = name;
        var page = KOVER.GetPage(name);
        if(page && KOVER.getGlobals(name+'Ready')){
            KOVER._currentPage(name);
            ko.applyBindings(page.viewModel, page.body);
            document.body.appendChild(page.body);
        }else{
            setTimeout(renderPage, 0, name);    //@todo limit numbers of attempts
        }

    }


    //render module subscribers
    KOVER.On({
        'page:render': renderPage,
        'page:compile': compilePage
    })
});