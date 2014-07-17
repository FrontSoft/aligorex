define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services_IT_consult'),
    Regions = Page.layout({
        CloneSwipedMenu: KOVER.Ui({extend: 'SwipedMenu'}),
        Header: KOVER.Ui('header'),
        Body: KOVER.Ui('main')
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
        BlockSubTitle_1: KOVER.Ui('h4', {
            text: '{{BlockSubTitle_1}}'
        }),
        BlockList_1: KOVER.Ui('ul', {
            Title: KOVER.Ui('li', {
                text: '{{this}}'
            }),            
            foreach: '{{BlockList_1}}'
        })
    });
});