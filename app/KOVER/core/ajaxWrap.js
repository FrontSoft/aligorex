define(function(){
    'use strict';

    // simple Promise implementation
    function Promise(){
        var self = this;
        this.store = [];
        this.resolve = function(result){
            self.complete('resolve', result);
        };
        this.reject = function(resutl){
            self.complete('reject', resutl);
        };
    }

    Promise.prototype = {
        then: function(success, failure){
            this.store.push({resolve: success, reject: failure});
            return this;
        },
        complete: function(type, result){
            while(this.store[0]){
                this.store.shift()[type](result);
            }
        }
    };

    //wrapper for XHR
    function Ajax(params){
        var xhr = new XMLHttpRequest(),
            promise = new Promise(),
            method = params.method || 'GET',
            url = params.url || '/',
            data = params.data || {},
            status = params.status || 200;

        xhr.open(method, url, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === status){
                    (function(d){setTimeout(promise.resolve, 0, d)}(xhr.response));
                }else{
                    (function(d){setTimeout(promise.reject, 0, d)}('Error '+xhr.status));
                }
            }
        };
        if(params.before && typeof params.before === 'function'){
            params.before(xhr);
        }
        xhr.send(data);
        return promise;
    }

    return {
        Ajx: Ajax,
        Prms: Promise
    };
});