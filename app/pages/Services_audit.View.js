define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services_audit'),
    Regions = Page.layout({
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
        BlockList_1: KOVER.Ui('ul', {
            foreach: '{{BlockList_1}}',

            Title: KOVER.Ui('li', {
                text: '{{this}}'
            })
        }),
        BlockTitle_1: KOVER.Ui('h3', {
            text: '{{BlockTitle_1}}'
        }),
        BodyBlock_2: KOVER.Ui('p', {
            text: '{{BodyBlock_2}}'
        }),
        BlockSubTitle_1: KOVER.Ui('h4', {
            text: '{{BlockSubTitle_1}}'
        }),
        BlockList_2: KOVER.Ui('ul', {
            foreach: '{{BlockList_2}}',

            Title: KOVER.Ui('li', {
                text: '{{this}}'
            })
        }),
        BlockTitle_2: KOVER.Ui('h3', {
            text: '{{BlockTitle_2}}'
        }),
        BodyBlock_3: KOVER.Ui('p', {
            text: '{{BodyBlock_3}}'
        })
    });
});