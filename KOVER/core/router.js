define(['ko', 'globals', 'mediator'], function(ko, globals, mediator){
    //router
    var HASH = ko.observable();
    globals.setGlobals('__HASH__', HASH);
    var curPage = globals.setGlobals('_currentPage', ko.observable());

    function setHash(name){
        var hash = globals.getGlobals('__HASH__');
        hash(name);
        window.location.hash = name;
    }

    var compile = function(name){
        if( document.getElementById(name, document.body) === null ){
            require(['render', '../../pages/'+name+'.View', '../../pages/'+name+'.VM'], function(render, page, VM){
                mediator.SyncFire('page:compile', [name, VM]);
            });
            return true;
        }else{
            curPage(name);
            setHash(name);
            return false;
        }
    };

    var render = function(name) {
        mediator.Fire('page:render', [name])
            .done(function(){
                setHash(name);
            });
    };

    var goTo = function(name) {
        var green = compile.call(this, name);
        if(green) render(name);
    };

    window.addEventListener('hashchange', function(e){
        var hash = globals.getGlobals('__HASH__'),
            fromUrl = e.newURL.replace(/(^.*#)/, '');
        if(hash() !== fromUrl){
            goTo(fromUrl);


        }
    }, false);

    return {
        GoTo: goTo,
        Render: render,
        Compile: compile
    };
});
