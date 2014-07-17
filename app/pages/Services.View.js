define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services'),
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
        BlockLinks: KOVER.Ui('ul', {
            foreach: '{{BlockLinks}}',

            LinkTitle: KOVER.Ui('li', {
                text: '{{LinkTitle}}',
                menuLink: '{{LinkPath}}'
            })
        })
    });
});