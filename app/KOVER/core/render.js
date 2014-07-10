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
        recurciveBuilder(page.viewObject, page.body, null);
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
            child = KOVER.Utils.has(obj, 'DOM') ? node.appendChild( obj.DOM.cloneNode(true) ) : node;
            child.setAttribute('kr', bindName);

            KOVER.Utils.has(obj, 'BIND') ? binds[bindName] = obj.BIND : '';
        }

        KOVER.Utils.each(obj, function(value, key){
            if( value instanceof KOVER.Ui ){
                recurciveBuilder(value, child, key);
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


    function renderBlock(obj, name, callback){
        if(!KOVER.Utils.isEmpty(obj)){
            var block = document.createElement('div');
            binds = {};
            recurciveBuilder(obj, block, name);

            if(callback){
                callback(block, binds);
            }else{
                return {DOM: block, BIND: binds};
            }
        }
    }

    //render module subscribers
    KOVER.On({
        'page:render': renderPage,
        'page:compile': compilePage,
        'page:renderBlock': renderBlock
    })
});