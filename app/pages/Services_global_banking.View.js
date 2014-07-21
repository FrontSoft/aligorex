define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services_global_banking'),
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
        BlockTitle_1: KOVER.Ui('h4', {
            text: '{{BlockTitle_1}}'
        }),
        BlockList: KOVER.Ui('ul', {
            Title: KOVER.Ui('li', {
                text: '{{this}}'
            }),            
            foreach: '{{BlockList}}'
        }),
        BodyBlock_2: KOVER.Ui('p', {
            BodyBlock_2_text: KOVER.Ui('span', {text: '{{BodyBlock_2_text}}'}),
            BodyBlock_2_link: KOVER.Ui('a', {
                text: '{{BodyBlock_2_link_text}}',
                attr: {href:'http://aligorex.com/korporativnye-uslugi/bankovskie-scheta/stoimost-uslug/'}
            }),
        })
    });
});