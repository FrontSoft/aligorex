define(['ko', 'userConf'], function(ko, cfg){
    'use strict';


    return {
        class : {
            update: function(element, valueAccessor){
                return ko.bindingHandlers.css.update(element, function(){
                    var val = ko.unwrap(valueAccessor()), obj={};
                    return obj['class'] = val;
                });
            }
        },
        setKOver : {
            update: function(element, valueAccessor){
                return ko.bindingHandlers.attr.update(element, function(){
                    return {
                        kr: ko.unwrap(valueAccessor())
                    };
                })
            }
        },
        extend : {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext){

                function returnExtended(pageName){
                    var data = kover.GetPage(pageName);
                    return data.body.querySelector('[kr='+valueAccessor()+']');
                }

                var kover = require('kover'),
                    name = bindingContext.$root.pageName,
                    extended = returnExtended(name),
                    nodeBinds = allBindings(),
                    parent = element.parentNode,
                    krAttr = element.getAttribute("kr"),
                    value = valueAccessor(),
                    extName;

                if(extended){
                    extended = extended.cloneNode(true);
                    extName = name;
                }else{
                    extName = cfg.app.mainPage;
                    var lookInApp = returnExtended(extName);
                    if(!lookInApp) return;  //@todo throw exeption

                    extended = lookInApp.cloneNode(true);
                }

                kover.SyncFire( 'provider:extendBind', [extName, name, krAttr, extended.getAttribute("kr")] );
                var obj = kover.Utils.find(kover.GetPage(extName).viewObject, value, function(i){return i.nodeType === null});
                kover.SyncFire( 'page:renderBlock', [obj[0], function(dom, binds){
                    kover.SyncFire('bindClass:addBind', [name, binds]);
                }]);

                extended.setAttribute("kr", krAttr);
                parent.insertBefore(extended, element);
                parent.removeChild(element);
                ko.applyBindings(kover.GetPage(name).viewModel, extended);
            }
        },
        detachedSwipe : {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext){

                var Hammer = require('hammer'),
                    args = ko.unwrap(valueAccessor()),
                    options = (args.hasOwnProperty('options')) ? args.options : {},
                    direction = (options.hasOwnProperty('direction')) ? options.direction : 'right',
                    eventName,
                    eventBackName,
                    callback = (args.hasOwnProperty('callback')) ? args.callback : false,
                    transform,
                    hammerOptions = {
                      dragLockToAxis: true,
                      dragBlockHorizontal: true,
                      dragBlockVertical: true
                    },
                    hammertime = new Hammer(element.parentElement, hammerOptions);

                element.parentElement.style.position = 'relative';
                element.parentElement.style.overflow = 'hidden';
                element.style.position = 'absolute';
                
                switch(direction) {
                    case 'top':
                        transform = 'translate(0, 100%)';
                        eventName = 'swipeup';
                        eventBackName = 'swipedown';
                        element.style.bottom = 0;
                        break;
                    case 'bottom':
                        transform = 'translate(0, -100%)';
                        eventName = 'swipedown';
                        eventBackName = 'swipeup';
                        element.style.top = 0;
                        break;
                    case 'left':
                        transform = 'translate(100%, 0)';
                        eventName = 'swipeleft';
                        eventBackName = 'swiperight';
                        element.style.right = 0;
                        break;
                    default:
                        transform = 'translate(-100%, 0)';
                        eventName = 'swiperight';
                        eventBackName = 'swipeleft';
                        element.style.left = 0;
                }
                element.style.webkitTransform = transform;
                element.style.transitionProperty = 'transform';
                element.style.transitionDuration = '300ms';
                element.style.transitionTimingFunction = 'linear';

                hammertime.on(eventName, function(event){
                    event.preventDefault();

                    element.style.webkitTransform = 'translate(0, 0)';
                    if(typeof callback === 'function') callback.call(element);

                });

                hammertime.on(eventBackName, function(event){
                    event.preventDefault();
                    
                    element.style.webkitTransform = transform;
                    if(typeof callback === 'function') callback.call(element);
                });
                
            }
        },
        sideMenu : {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext){

                var Hammer = require('hammer'),
                    args = ko.unwrap(valueAccessor()),
                    options = (args.hasOwnProperty('options')) ? args.options : {},
                    direction = (options.hasOwnProperty('direction')) ? options.direction : 'right',
                    forward,
                    backward,
                    mark = 1,
                    callback = (args.hasOwnProperty('callback')) ? args.callback : false,
                    transform,
                    propName,
                    delta,
                    hammerOptions = {
                      dragLockToAxis: true,
                      dragBlockHorizontal: true,
                      dragBlockVertical: true
                    },
                    hammertime = new Hammer(element.parentElement, hammerOptions);

                element.parentElement.style.position = 'relative';
                element.parentElement.style.overflow = 'hidden';
                element.style.position = 'absolute';
                
                switch(direction) {
                    case 'top':
                        transform = 'translate(0, 100%)';
                        forward = 'up';
                        backward = 'down';
                        mark = -1;
                        propName = 'bottom';
                        delta = 'deltaY';
                        break;
                    case 'bottom':
                        transform = 'translate(0, -100%)';
                        forward = 'down';
                        backward = 'up';
                        propName = 'top';
                        delta = 'deltaY';
                        break;
                    case 'left':
                        transform = 'translate(100%, 0)';
                        forward = 'left';
                        backward = 'right';
                        mark = -1;
                        propName = 'right';
                        delta = 'deltaX';
                        break;
                    default:
                        transform = 'translate(-100%, 0)';
                        forward = 'right';
                        backward = 'left';
                        propName = 'left';
                        delta = 'deltaX';
                }
                element.style[propName] = 0;
                element.style.webkitTransform = transform;
                element.style.transitionProperty = propName;
                element.style.transitionDuration = '200ms';
                element.style.transitionTimingFunction = 'linear';

                hammertime.on('drag', function(event){
                    event.gesture.preventDefault();

                    var forwardDragEndHandler = function(event){
                        element.style[propName] = (offset > elSize * 0.3) ? elSize + 'px' : '0px';
                    }

                    var backwardDragEndHandler = function(event){
                        element.style[propName] = ((elSize - offset) < elSize * 0.3) ? elSize + 'px' : '0px';
                    }

                    var elSize = (direction === 'left' || direction === 'right') ? parseFloat(element.offsetWidth) : parseFloat(element.offsetHeight),
                        offset = parseFloat(element.style[propName]);
                    
                    if((event.gesture.direction === forward) && (offset < elSize)){
                        element.style[propName] = event.gesture[delta] * mark + 'px';
                        hammertime.off('dragend', backwardDragEndHandler);
                        hammertime.on('dragend', forwardDragEndHandler);
                    }
                    if((event.gesture.direction === backward) && (offset > 0)){
                        element.style[propName] = elSize + event.gesture[delta] * mark + 'px';
                        hammertime.off('dragend', forwardDragEndHandler);
                        hammertime.on('dragend', backwardDragEndHandler);
                    }   

                    if(typeof callback === 'function') callback.call(element);

                });

            }
        },
        slider : {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext){

                var Hammer = require('hammer'),
                    utils = require('utils'),
                    args = ko.unwrap(valueAccessor()),
                    options = (args.hasOwnProperty('options')) ? args.options : {},
                    height = (options.hasOwnProperty('height')) ? options.height : '300px',
                    curInd = (options.hasOwnProperty('firstSlideInd')) ? options.firstSlideInd : 0,
                    curEl = element.childNodes[curInd],
                    callback = (args.hasOwnProperty('callback')) ? args.callback : false,
                    hammerOptions = {
                      dragLockToAxis: true,
                      dragBlockHorizontal: true,
                      dragBlockVertical: true
                    },
                    hammertime = new Hammer(element, hammerOptions);

                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.style.height = height;

                utils.each(element.childNodes, function(value, index, list) {
                    value.style.position = 'absolute';
                    value.style.width = '100%';
                    value.style.transitionProperty = 'left right';
                    value.style.transitionDuration = '0';
                    value.style.transitionTimingFunction = 'linear';
                });

                var i = curInd;
                while(element.childNodes[i+1]){
                    element.childNodes[i+1].style.right = "-100%";
                    i++;
                }
                i = curInd;
                while(element.childNodes[i-1]){
                    element.childNodes[i-1].style.left = "-100%";
                    i--;
                }

                hammertime.on("drag", function(event){
                    event.preventDefault();

                    var direction = event.gesture.direction,
                        directionOpposite = (direction === 'right') ? 'left' : 'right',
                        nextEl = (direction === 'right') ? curEl.previousSibling : curEl.nextSibling,
                        width = parseFloat(curEl.offsetWidth),
                        delta = event.gesture.deltaX,
                        mark = (direction === 'right') ? -1 : 1,
                        hammertime = new Hammer(event.target, hammerOptions);

                    var slideChange = function(event){
                        event.preventDefault();

                        curEl.style.transitionDuration = nextEl.style.transitionDuration = '100ms';
                        if(event.type === 'dragend'){
                            if(-parseFloat(curEl.style[direction]) > width / 2){
                                curEl.style[direction] = -width + 'px';
                                nextEl.style[directionOpposite] = '0px';
                                curEl.style[directionOpposite] = nextEl.style[direction] = '';
                                curEl = nextEl;
                                callback();
                            }else{                                
                                if(nextEl !== curEl) nextEl.style[directionOpposite] = -width + 'px';
                                curEl.style[direction] = '0px';
                            }
                        }

                    }

                    var slideBack = function(event){
                        curEl.style[directionOpposite] = '0px';
                        hammertime.off("dragend", slideBack);
                    }

                    if(nextEl === null) {
                        curEl.style.transitionDuration = '100ms';
                        curEl.style[directionOpposite] = '3px';
                        curEl.style[direction] = '';
                        hammertime.on("dragend", slideBack);

                        return;
                    }

                    curEl.style.transitionDuration = nextEl.style.transitionDuration = '0';
                    curEl.style[direction] = delta * mark + 'px';
                    nextEl.style[directionOpposite] = (-width + delta * (-mark)) + 'px';
                    curEl.style[directionOpposite] = nextEl.style[direction] = '';
                    
                    hammertime.on("dragend swipeleft swiperight", slideChange);
                    
                });

            }
        }
    };
});