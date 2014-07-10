define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Company'),
    Regions = Page.layout({
        SwipedMenu: KOVER.Ui('nav', {sideMenu: {}, class: "main-nav"}),
        Header: KOVER.Ui('header'),
        Body: KOVER.Ui('main')
    });

    Regions.SwipedMenu({
        TopMenu: KOVER.Ui('ul', {
            foreach: '{{MenuItems}}',

            items: [
                {Home: KOVER.Ui('a', {
                    text: '{{title}}',
                    menuLink: '{{path}}',

                    Icon: KOVER.Ui('img', {})

                } )}
            ]
        })        
    });

    Regions.Header({
        HeaderTitle: KOVER.Ui('h2', {
            text: '{{HeaderTitle}}'
        })
    });

    Regions.Body({
        TextBlocks: KOVER.Ui({
            foreach: '{{BodyTextBlocks}}',

            BodyTextBlock: KOVER.Ui('p', {
                text: '{{this}}'
            })
        })
    });
});