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

            KOVER.Utils.has(obj, 'BIND') ? binds[bindName] = processBind(obj.BIND, this) : '';
        }

        KOVER.Utils.each(obj, function(value, key){
            if( value instanceof KOVER.Ui ){
                recurciveBuilder.call(this, value, child, key);
            }
        }, this);
    }

    function processBind(bind, VM){
        if( KOVER.Utils.isEmpty(bind) ) return;

        KOVER.Utils.each(bind, function(val, key){
            var vmKey = typeof val === 'string' ? /\{\{(.+)\}\}/g.exec(val) : false;
            if(vmKey){
                var dataRes = KOVER.Utils.find(VM, vmKey[1]);   //@todo exec can return more results
                if(!KOVER.Utils.isEmpty(dataRes)){
                    bind[key] = dataRes[0];
                }else{
                    bind[key] = '';
                }
            }
        });
        return bind;
    }

    /**
     * applyBindings to node and append to body
     * @param {string} name
     */
    function renderPage(name){
        name = name || 'App';
        var page = KOVER.GetPage(name);
        if(page){
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