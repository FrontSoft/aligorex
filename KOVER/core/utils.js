define([], function(){
    'use strict';

    var breaker = {};
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty   = ObjProto.hasOwnProperty,
        nativeMap          = ArrayProto.map;

    var utils = function(obj) {
        if (obj instanceof utils) return obj;
        if (!(this instanceof utils)) return new utils(obj);
    };

    utils.keys = function(obj) {
        if (!(obj === Object(obj))) return [];
        var keys = [];
        for (var key in obj) if (obj.hasOwnProperty(key)) keys.push(key);
        return keys;
    };

    utils.each = function(obj, iterator, context) {
        if (obj == null) return obj;
        if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            var keys = utils.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
            }
        }
        return obj;
    };

    utils.map = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        utils.each(obj, function(value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    };

    utils.extend = function(obj) {
        utils.each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

    utils.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };

    utils.find = function(obj, key, expression) {
        if (obj !== null && obj !== undefined && utils.has(obj, key))
            return [ obj[key] ];

        var res = [];
        if(!expression){
            expression = function(val){
                return true;
            }
        }
        utils.each(obj, function(v) {
            if (typeof v == "object" && ( res.length === 0 && expression(v) ) && (v = utils.find(v, key, expression)).length)
                res.push.apply(res, v);
        });
        return res;
    };

    utils.isArray = function(obj) {
        return toString.call(obj) == '[object Array]';
    };

    utils.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
        utils['is' + name] = function(obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });

    utils.isEmpty = function(obj) {
        if (obj == null) return true;
        if (utils.isArray(obj) || utils.isString(obj)) return obj.length === 0;
        for (var key in obj) if (utils.has(obj, key)) return false;
        return true;
    };

    utils.clone = function clone(src, deep) {
        var toString = Object.prototype.toString;
        if(src && typeof src != "object"){
            return src;
        }
        if(src.clone && toString.call(src.clone) == "[object Function]"){
            return src.clone(deep);
        }
        if(src.nodeType && toString.call(src.cloneNode) == "[object Function]"){
            return src.cloneNode(deep);
        }
        if(toString.call(src) == "[object Date]"){
            return new Date(src.getTime());
        }
        if(toString.call(src) == "[object RegExp]"){
            return new RegExp(src);
        }
        if(toString.call(src) == "[object Function]"){
            return (function(){
                src.apply(this, arguments);
            });

        }
        var ret, index;
        //Array
        if(toString.call(src) == "[object Array]"){
            ret = src.slice();
            if(deep){
                index = ret.length;
                while(index--){
                    ret[index] = clone(ret[index], true);
                }
            }
        }
        //Object
        else {
            ret = src.constructor ? new src.constructor() : {};
            for (var prop in src) {
                ret[prop] = deep
                    ? clone(src[prop], true)
                    : src[prop];
            }
        }
        return ret;
    };


    return utils;
});

