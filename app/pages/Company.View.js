define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Company'),
    Regions = Page.layout({
        SwipedMenu: KOVER.Ui('nav', {sideMenu: {toggleElementId: "toggle-side-menu"}, class: "main-nav"}),
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
        MenuButton: KOVER.Ui('button', {
            text: 'menu',
            attr: {id: "toggle-side-menu"}
        }),
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