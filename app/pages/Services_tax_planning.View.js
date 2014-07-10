define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services_tax_planning'),
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
        BodyBlock_1_p_1: KOVER.Ui('p', {
            text: '{{BodyBlock_1_p_1}}'
        }),
        BlockTitle_1: KOVER.Ui('h4', {
            text: '{{BlockTitle_1}}'
        }),
        BlockList: KOVER.Ui('ul', {
            Title: KOVER.Ui('li', {
                text: '{{this}}'
            }),            
            foreach: '{{BlockList}}'
        })
    });
});