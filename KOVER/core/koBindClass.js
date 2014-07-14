define(['classicBinds', 'defaultBinds'], function(classicBinds, defaultBinds){
    'use strict';

    var utils = require('utils'),
        mediator = require('mediator'),
        globals = require('globals'),
        ko = require('ko');

    //register custom bindings(classic method)
    utils.each(classicBinds, function(value, key){
        ko.bindingHandlers[key] = value;
    });

    /**
     * save bind to storage
     * @param {string} name of page
     * @param {object} binds
     */
    function saveBindToStorage(name, binds){
        if(defaultBinds['page:'+name]){
            utils.extend(defaultBinds['page:'+name], binds);
        }else {
            defaultBinds['page:' + name] = binds;
            globals.setGlobals(name+'Ready', true);
        }
    }

    /**
     * helper functions for parse text nodes
     * @param {string} expressionText - name of viewModel property
     * @returns {*[]}
     */
    function wrapExpresssion(expressionText) {
        return [
            document.createComment("ko getText:"+expressionText),
            document.createComment("/ko")
        ];
    }

    /**
     * Helper function for extend binding
     * @todo test with handlers on nested elements
     * @param {string} page
     * @param {string} bind
     * @param {string} origin
     */
    function extBindInstance(masterPage, slavePage, bind, origin){
        var slave = utils.find(defaultBinds['page:' + slavePage], bind),
            master = utils.find(defaultBinds['page:' + masterPage], origin);
        delete slave[0].extend;
        utils.extend(slave[0], master[0]);
    }

    /**
     * parse text node for text binding
     * @param {string} textToParse
     * @param {function} outerTextCallback
     * @param {function} expressionCallback
     */
    function parseInterpolationMarkup(textToParse, outerTextCallback, expressionCallback) {
        function innerParse(text) {
            var innerMatch = text.match(/^([\s\S]*?)}}([\s\S]*)\{\{([\s\S]*)$/);
            if (innerMatch) {
                expressionCallback(innerMatch[1]);
                outerParse(innerMatch[2]);
                expressionCallback(innerMatch[3]);
            } else {
                expressionCallback(text);
            }
        }
        function outerParse(text) {
            var outerMatch = text.match(/^([\s\S]*?)\{\{([\s\S]*)}}([\s\S]*)$/);
            if (outerMatch) {
                outerTextCallback(outerMatch[1]);
                innerParse(outerMatch[2]);
                outerTextCallback(outerMatch[3]);
            } else {
                outerTextCallback(text);
            }
        }
        outerParse(textToParse);
    }


    //bindClass module subscribers
    mediator.On({
        'bindClass:addBind': saveBindToStorage,
        'provider:extendBind': extBindInstance
    });

    function processBind(bind, context){
        if( utils.isEmpty(bind) || typeof bind === 'function') return bind;

        var rightBind = {};
        utils.each(bind, function(val, key){
            var vmKey = typeof val === 'string' ? /\{\{(.+)\}\}/g.exec(val) : false;
            if(vmKey){
                var dataRes = utils.find(context, vmKey[1]);   //@todo exec can return more results
                if(!utils.isEmpty(dataRes)){
                    rightBind[key] = typeof dataRes[0] === 'string' ? val.replace(/\{\{(.+)\}\}/, dataRes[0]) : dataRes[0];
                }
            }else if(typeof val === 'object' && val !== null && val !== undefined){
                for(var prop in val)if( utils.has(val, prop) ){
                    var hp = {};
                    hp[prop] = val[prop];
                    rightBind[key] = processBind(hp, context);
                }
            }else{
                rightBind[key] = val;
            }
        });
        return rightBind;
    }

    return {
        /**
         * constructor for new binding provider
         * @constructor
         */
        Main: function () {
            this.bindingObject = defaultBinds;

            /**
             * determine if an element has any bindings
             * @param {dom} node
             * @returns {string} works like boolean
             */
            this.nodeHasBindings = function (node) {
                if(node.nodeType == 8){
                    return node.nodeValue.replace(/^ko\s/, '');
                }else{
                    return node.getAttribute ? node.getAttribute("kr") : false;
                }

            };

            /**
             * return the bindings given a node and the bindingContext
             * @param {dom} node
             * @param {object} bindingContext
             * @returns {object} binds
             */
            this.getBindings = function (node, bindingContext) {
                var result = {}, classes, bindArg = '';

                //find what kind of binding node have
                if(node.nodeType == 8){
                    var ArgsMath = /^(.+):(.+)/g.exec( node.nodeValue.replace(/^ko\s/, '') );
                    classes = ArgsMath[1];
                    bindArg = ArgsMath[2];
                }else {
                    classes = node.getAttribute("kr");
                }

                if (classes) {
                    classes = classes.split(' ');
                    var selectContext = bindingContext.$data;

                    //evaluate each class, build a single object to return
                    for (var i = 0, j = classes.length; i < j; i++) {
                        var nameClass = classes[i],
                            bindingAccessor = this.bindingObject[nameClass] ?
                                this.bindingObject[nameClass] :
                                this.bindingObject['page:'+bindingContext.$root.pageName][nameClass];

                        if (bindingAccessor) {
                            bindingAccessor = processBind(bindingAccessor, selectContext);
                            var binding = typeof bindingAccessor == "function" ? bindingAccessor.call(selectContext, bindArg) : bindingAccessor;
                            ko.utils.extend(result, binding);
                        }
                    }
                }

                return result;
            };

            /**
             * replace {{ some }} in text nodes to ko virtual binding
             * @param {dom} node
             * @returns {Array} nodes
             */
            this.preprocessNode = function(node) {
                if (node.nodeType === 3 && node.nodeValue && node.nodeValue.indexOf('{{') !== -1) {
                    var nodes = [];

                    var addTextNode = function(text) {
                        if (text)
                            nodes.push(document.createTextNode(text));
                    };

                    var wrapExpr = function(expressionText) {
                        if (expressionText)
                            nodes.push.apply(nodes, wrapExpresssion(expressionText));
                    };

                    parseInterpolationMarkup(node.nodeValue, addTextNode, wrapExpr)

                    if (nodes.length > 1) {
                        if (node.parentNode) {
                            for (var i = 0; i < nodes.length; i++) {
                                node.parentNode.insertBefore(nodes[i], node);
                            }
                            node.parentNode.removeChild(node);
                        }
                        return nodes;
                    }
                }
            };
        }

    }
});