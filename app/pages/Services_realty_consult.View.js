define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services_realty_consult'),
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
        BodyBlock_2: KOVER.Ui('p', {
            text: '{{BodyBlock_2}}'
        }),
        BodyBlock_3: KOVER.Ui('p', {
            text: '{{BodyBlock_3}}'
        }),
        BlockTitle_1: KOVER.Ui('h3', {
            text: '{{BlockTitle_1}}'
        }),
        BodyBlock_4: KOVER.Ui('p', {
            text: '{{BodyBlock_4}}'
        }),
        BlockSubTitle_1: KOVER.Ui('h4', {
            text: '{{BlockSubTitle_1}}'
        }),
        BlockList_1: KOVER.Ui('ul', {
            Title: KOVER.Ui('li', {
                text: '{{this}}'
            }),            
            foreach: '{{BlockList_1}}'
        }),
        BlockTitle_2: KOVER.Ui('h3', {
            text: '{{BlockTitle_2}}'
        }),
        BodyBlock_5: KOVER.Ui('p', {
            text: '{{BodyBlock_5}}'
        }),
        BlockSubTitle_2: KOVER.Ui('h4', {
            text: '{{BlockSubTitle_2}}'
        }),
        BlockList_2: KOVER.Ui('ul', {
            Title: KOVER.Ui('li', {
                text: '{{this}}'
            }),            
            foreach: '{{BlockList_2}}'
        }),
        BlockTitle_3: KOVER.Ui('h3', {
            text: '{{BlockTitle_3}}'
        }),
        BodyBlock_6: KOVER.Ui('p', {
            text: '{{BodyBlock_6}}'
        }),
        BodyBlock_7: KOVER.Ui('p', {
            text: '{{BodyBlock_7}}'
        }),
        BlockSubTitle_3: KOVER.Ui('h4', {
            text: '{{BlockSubTitle_3}}'
        }),
        BlockList_3: KOVER.Ui('ul', {
            Title: KOVER.Ui('li', {
                text: '{{this}}'
            }),            
            foreach: '{{BlockList_3}}'
        }),
    });
});