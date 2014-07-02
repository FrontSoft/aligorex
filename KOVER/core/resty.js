define(function(){

    var utils = require('utils'),
        Ajx = require('ajx').Ajx,
        restify = function(Ctor, resource, config){

        var serialize = config.serialize || function(list){return list};
        var deserialize = config.deserialize || function(list){return list};

        utils.extend(Ctor, {
            get: function(id, callback){
                //create new viewModel
                var model = new Ctor;
                Ajx('GET', '/' + resource + '/' + id).
                    then(function(data){
                        //load data into viewModel
                        var result = deserialize(data, config.model);
                        //callback with newly instantiated viewModel
                        if(callback) callback.call(model, result);
                    });
                return model;
            },
            create: function(postData, callback){
                //create new viewModel
                var model = new Ctor();
                Ajx('POST', '/' + resource, postData).
                    then(function(data){
                        //load data into viewModel
                        var result = deserialize(data, config.model);
                        //callback with newly instantiated viewModel
                        if(callback) callback.call(model, result);
                    });
                return model;
             },
             update: function(id, instance, callback){
                Ajx('PUT', '/' + resource + id, serialize(instance)).
                    then(function(data){
                         //load data into viewModel
                        var result = deserialize(data, config.model);
                        //callback with newly instantiated viewModel
                        if(callback) callback.call(instance, result);
                    });
             },
             remove: function(id, callback){
                Ajx('DELETE', '/' + resource + '/' + id).
                    then(function(data){
                        //callback with response
                        if(callback) callback(data);
                    });
             }
        });


        utils.extend(Ctor.prototype, {
            load: function(id, params, callback){
                var self = this;
                Ajx('GET', '/' + resource + '/' + id, params).
                    then(function(data){
                        //load data into viewModel
                        var result = deserialize(data, config.model);
                        //callback with newly instantiated viewModel
                        if(callback) callback.call(self, result);
                    });
            },
            create: function(postData, callback){
                var self = this;
                Ajx('POST', '/' + resource, postData).
                    then(function(data){
                         //load data into viewModel
                        var result = deserialize(data, config.model);
                        //callback with newly instantiated viewModel
                        if(callback) callback.call(self, result);
                     });
            },
            save: function(id, putData, callback){
                var self = this;
                Ajx('PUT', '/' + resource + '/' + id, putData).
                    then(function(data){
                        //callback with newly instantiated viewModel
                        if(callback) callback.call(self, data);
                    });
            },
            delete: function(id, callback){
                var self = this;
                Ajx('DELETE', '/' + resource + '/' + id).
                    then(function(data){
                        //callback with newly instantiated viewModel
                        if(callback) callback.call(self, data);
                    });
             }
        });

        return Ctor;
    };
});
