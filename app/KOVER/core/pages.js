define( function(){
    'use strict';

    var pageStorage = {},
        utils = require('utils'),
        ui = require('ui'),
        mediator = require('mediator'),
        fragment = document.createElement('section');

    /**
     * save page to storage
     * @param {string} name
     * @param {object} pageObj from ui
     */
    function savePageToStorage(name, pageObj){
        pageStorage[name] = pageObj;
    }

    /**
     * ui function to create and store new page
     * return new page
     * @param {string} name
     * @returns {pageConstructor}
     */
    function newPage(name){
        var page = new pageConstructor(name);
        page.body.setAttribute('kr', name+' activePage');
        page.body.id = name;
        savePageToStorage(name, page);

        return page;
    }

    /**
     * get existing page from storage
     * @param {string} name
     * @returns {object} page or undefined
     */
    function getPage(name){
        return utils.has(pageStorage, name) ? pageStorage[name] : undefined;
    }

    /**
     * constructor for new pages
     * @param {string} name
     */
    function pageConstructor(name){
        this.body = fragment.cloneNode(true);
        this.viewObject = {};
        this.viewModel = {pageName: name};
    }

    /**
     * create regions for page
     * return hash of functions  - one by region
     * @param {object} obj
     * @returns {object}
     */
    pageConstructor.prototype.layout = function(obj){
        var regionsFunc = {};

        utils.each(obj, function(value, key){
            var child = this.viewObject[key] = value;

            regionsFunc[key] = function(regionObj){
                var topRegionLevel = ui(regionObj);
                delete topRegionLevel.DOM;
                delete topRegionLevel.BIND;

                utils.extend(this, topRegionLevel);
            }.bind(child);

        }, this);

        return regionsFunc;
    };

    //KOVER interface
    return {
        GetPage: getPage,
        NewPage: newPage
    };
});
