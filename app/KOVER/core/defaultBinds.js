define(function(){
    'use strict';


    var BindsObj = function(){
        this.getText = function(args){
            if(args === 'this') return {text: this};
            return {text: this[args]};
        };
        this.activePage = function(){
            var KOVER = require('kover');
            if( this.pageName === KOVER._currentPage() ){
                return {visible: true};
            }
            return {visible: false};
        };
    };

    return new BindsObj();
});