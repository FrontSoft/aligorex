define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services'),
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
        BlockTitle_1: KOVER.Ui('h3', {
            text: '{{BlockTitle_1}}'
        }),
        ServicesLinksBlock_1: KOVER.Ui('ul', {
            items: [
                {Block_1_Link_1: KOVER.Ui('a', {
                    text: '{{Block_1_Link_1}}',
                    Name: KOVER.Ui('img', {}),
                    // click: function(){KOVER.GoTo('Issues');}
                } )},
                {Block_1_Link_2: KOVER.Ui('a', {
                    text: '{{Block_1_Link_2}}',
                    Name: KOVER.Ui('img', {}),
                    // click: function(){KOVER.GoTo('Issues');}
                } )},
                {Block_1_Link_3: KOVER.Ui('a', {
                    text: '{{Block_1_Link_3}}',
                    Name: KOVER.Ui('img', {}),
                    // click: function(){KOVER.GoTo('Slides');}
                } )},
                {Block_1_Link_4: KOVER.Ui('a', {
                    text: '{{Block_1_Link_4}}',
                    Name: KOVER.Ui('img', {}),
                    // click: function(){KOVER.GoTo('Slides');}
                } )},
                {Block_1_Link_5: KOVER.Ui('a', {
                    text: '{{Block_1_Link_5}}',
                    Name: KOVER.Ui('img', {}),
                    // click: function(){KOVER.GoTo('Slides');}
                } )}
            ],
            class: "services-links"
        }),
        BlockTitle_2: KOVER.Ui('h3', {
            text: '{{BlockTitle_2}}'
        }),
        BlockTitle_3: KOVER.Ui('h3', {
            text: '{{BlockTitle_3}}'
        }),
        BlockTitle_4: KOVER.Ui('h3', {
            text: '{{BlockTitle_4}}'
        }),
        BlockTitle_5: KOVER.Ui('h3', {
            text: '{{BlockTitle_5}}'
        }),
        BlockTitle_6: KOVER.Ui('h3', {
            text: '{{BlockTitle_6}}'
        }),
        BlockTitle_7: KOVER.Ui('h3', {
            text: '{{BlockTitle_7}}'
        }),
        BlockTitle_8: KOVER.Ui('h3', {
            text: '{{BlockTitle_8}}'
        }),
    });
});