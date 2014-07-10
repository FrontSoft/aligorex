define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services'),
    Regions = Page.layout({
        Header: KOVER.Ui('header'),
        Body: KOVER.Ui('main'),        
    });

    Regions.Header({
        HeaderTitle: KOVER.Ui('h2', {
            text: '{{HeaderTitle}}'
        })
    });

    Regions.Body({
        BodyBlock_1: KOVER.Ui('p', {
            text: '{{BodyBlock_1}}'
        }),
        BlockLinks: KOVER.Ui('ul', {
            BlockLink: KOVER.Ui('li', {
                text: '{{BlockLink}}',
                click: function(){KOVER.GoTo('Services_corporate');},
                clickBubble: false
            }),            
            foreach: '{{BlockLinks}}'
        })
    });
});