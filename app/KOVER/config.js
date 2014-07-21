require.config({
    paths: {
        ko: "../libs/knockout",
        hammer: "../libs/hammer",
        utils: 'utils',
        mediator: 'mediator',
        provider: 'koBindClass',
        ui: 'ui',
        pages: 'pages',
        start: 'start',
        render: 'render',
        kover: 'kover',
        ajx: 'ajaxWrap',
        resty: 'resty',
        userConf: "../../config"
    },
    shim: {
        ko: {
            exports: "ko"
        }
    },
    baseUrl: 'KOVER/core/'
});

require(['kover', 'userConf'], function(KOVER, settings){
    KOVER.Compile(settings.app.firstPage);
});