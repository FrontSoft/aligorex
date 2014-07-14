define(['utils'], function(utils){
    'use strict';

    var disableBinds = ['html', 'style', 'if', 'ifnot', 'event', 'hasFocus', 'unicName', 'template'];

    /**
     * HTML List constructor
     * @param {string} tag string ("ul" or "ol")
     * @param {object} parameters object
     */
    var List = function(tag, params) {
        HtmlNode.call(this, tag);

        if(utils.has(params, 'items')) {
            utils.each(params.items, function(val, key, list){
                var temp;
                this['Item'+key] = {};
                this['Item'+key] = temp = UI('li', val);
            }, this);
            delete params.items;
        }

        if (params) HtmlProp.call(this, params);
    };

    /**
     * HTML Input constructor
     * @param {string} tag string ("ul" or "ol")
     * @param {object} parameters object
     */
    var Input = function(tag, params) {

        // constructor for checkbox and radio input types
        var checkInput = function(tag, params) {
            HtmlNode.call(this, 'label');
            this['Input'] = {};
            this['Input'] = UI('input');
            HtmlProp.call(this['Input'], params);

            this['Outer'] = UI('div', {
                class: 'input-' + params.attr.type + '-outer',
                Inner: UI('div', {class:'input-' + params.attr.type + '-inner'})
            });
            HtmlProp.call(this, {class: 'input-check-wrap'});  
        };

        // constructor for simple input types
        var clearInput = function(tag, params) {
            HtmlNode.call(this, 'input');
            HtmlProp.call(this, params);               
        };

        // input types object pointing on constructor functions
        var types = {
            text: clearInput,
            password: clearInput,
            reset: clearInput,
            submit: clearInput,
            checkbox: checkInput,
            radio: checkInput
        };

        if(typeof params === 'object' && utils.has(params, 'attr') && utils.has(params.attr, 'type')) {
            if(utils.has(types, params.attr.type)) {
                types[params.attr.type].call(this, tag, params);
            } else {
                HtmlNode.call(this, tag);
                if (params) HtmlProp.call(this, params);
            }
        } else {
            HtmlNode.call(this, tag);
            if (params) HtmlProp.call(this, params);
        }
        
    };

    // types object pointing on specific constructor functions
    var types = {
        ul: List,
        ol: List,
        input: Input
    };

    /**
     * HTML element constructor function
     * @param {string} tag name string
     * @param {object} parameters object
     * @return {object} specific object containing DOM element, element bindings and nested elements
     */
    var UI = function(tag, params) {
        
        if (!(this instanceof UI)) return new UI(tag, params);

        if(tag || params) {
            if (typeof tag === 'object' && tag !== null) {
                params = tag;
                tag = false;
            }

            if (utils.has(types, tag)) {
                types[tag].call(this, tag, params);
            } else {
                var elTag = tag ? tag : 'div';
                HtmlNode.call(this, elTag);
                if (params) HtmlProp.call(this, params);
            }
        }
    };

    /**
     * DOM element constructor function
     * @param {string} tag name string
     * @return {object} DOM fragment
     */
    function HTMLTag(tag) {
        var regexp = new RegExp('[^A-Za-z0-9]', 'g');
        try {
            var element = document.createElement(tag.replace(regexp, ""));
        } catch(e) {
            return false;
        }
        return element;
    }

    /**
     * Attach DOM fragment to the element object
     * @param {string} tag name string
     */
    function HtmlNode(tag) {
        var elem = HTMLTag(tag);
        if(elem) {
            this.DOM =  elem;
        } else {
            throw new Error('illegal tag name');
        }
    }

    /**
     * Calls new constructor for nested elements
     * @param {object} parameters object
     */
    function HtmlProp(params) {
        var decouplePropsAndNestedEL = preprocess.call(this, params);
        this.BIND = decouplePropsAndNestedEL.Bind;
        utils.extend(this, decouplePropsAndNestedEL.Nested);
    }

    /**
     * Decouples nested elements and element specific bindings
     * @param {object} parameters object
     * @return {object} decoupled properties
     */
    function preprocess(params) {
        var Bind = {},
            Nested = {};

        utils.each(params, function(val, key, list) {
            if (val instanceof UI) {
                Nested[key] = val;
            } else if(key === 'text'){
                this.DOM.textContent = val;
            }else if(disableBinds.indexOf(key) === -1){
                Bind[key] = val;
            }
        }, this);
        return {
            Bind: Bind,
            Nested: Nested
        };
    }

    return UI;
});
