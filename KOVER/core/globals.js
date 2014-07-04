define(function(){
    'use strict';

    var storage = {};

    function setGlobals(key, value) {
        storage[key] = value;
    }
    function getGlobals(key) {
        return storage[key];
    }

    return {
        getGlobals: getGlobals,
        setGlobals: setGlobals
    }
});