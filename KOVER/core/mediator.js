define(function(){
    'use strict';

    return (function(){
        var Mediator = {};
        var eventSubscribers = {};

        function subscribeOne(eventName, handler){
            eventName = eventName || 'any';
            var subscribers = eventSubscribers[eventName];
            if (typeof subscribers === 'undefined') {
                subscribers = eventSubscribers[eventName] =[];
            }
            if(subscribers.indexOf(handler) === -1){
                subscribers.push(handler);
            }
            return handler;
        }


        function subscribeAll(eventsObj) {
            var eventName;
            for (eventName in eventsObj) {
                if (eventsObj.hasOwnProperty(eventName)) {
                    subscribeOne(eventName, eventsObj[eventName]);
                }
            }
        }


        function sub(eventNameOrHash, callback) {
            if (typeof eventNameOrHash === 'object') {
                return subscribeAll(eventNameOrHash);
            }
            return subscribeOne(eventNameOrHash, callback);
        }


        function pub(eventName, data, context){
            var subscribers = eventSubscribers[eventName],
                i, iMax;
            context = context || Mediator;
            data = (data instanceof Array) ? data : [data];

            if (typeof subscribers === 'undefined') {
                console.log('No current subscribers for {' + eventName + '}');
                return pub;
            }
            for (i = 0, iMax = subscribers.length; i < iMax; i += 1) {
                (function(n){
                    setTimeout(function(){
                        subscribers[n].apply(context, data);
                    }, 0);
                }(i));
            }
            return pub;
        }

        function syncPub(eventName, data, context){
            var subscribers = eventSubscribers[eventName],
                i, iMax;
            context = context || Mediator;
            data = (data instanceof Array) ? data : [data];

            if (typeof subscribers === 'undefined') {
                console.log('No current subscribers for {' + eventName + '}');
                return pub;
            }
            for (i = 0, iMax = subscribers.length; i < iMax; i += 1) {
                subscribers[i].apply(context, data);
            }
        }

        pub.done = function(callback){
            setTimeout(callback, 0);
            return pub;
        };


        function unsubscribe(eventName, existingCallback) {
            var subscribers = eventSubscribers[eventName],
                callbackIndex;

            if (typeof subscribers === 'undefined') { return; }
            callbackIndex = subscribers.indexOf(existingCallback);
            if (callbackIndex === -1) { return; }

            subscribers.splice(callbackIndex, 1);
        }

        function unsubscribeAll(eventName) {
            delete eventSubscribers[eventName];
        }

        Mediator = {
            Fire:       pub,
            SyncFire:   syncPub,
            On:         sub,
            Off:        unsubscribe,
            OffAll:     unsubscribeAll
        };

        return Mediator;
    }())
});