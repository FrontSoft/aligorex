define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Company'),
    Regions = Page.layout({
        SwipedMenu: KOVER.Ui('nav', {sideMenu: {}, class: "main-nav"}),
        Header: KOVER.Ui('header'),
        Body: KOVER.Ui('main')
    });

    Regions.SwipedMenu({
        TopMenu: KOVER.Ui('ul', {
            items: [
                {Home: KOVER.Ui('a', {
                    text: 'Главная',
                    Name: KOVER.Ui('img', {})
                    // click: function(){KOVER.GoTo('Home');}
                } )},
                {Company: KOVER.Ui('a', {
                    text: 'О компании',
                    Name: KOVER.Ui('img', {}),
                    click: function(){KOVER.GoTo('Company');}
                } )},
                {Works: KOVER.Ui('a', {
                    text: 'Работы',
                    Name: KOVER.Ui('img', {})
                    // click: function(){KOVER.GoTo('Works');}
                } )},
                {Services: KOVER.Ui('a', {
                    text: 'Услуги компании',
                    Name: KOVER.Ui('img', {}),
                    click: function(){KOVER.GoTo('Services');}
                } )},
                {Contacts: KOVER.Ui('a', {
                    text: 'Контакты',
                    Name: KOVER.Ui('img', {}),
                    click: function(){KOVER.GoTo('Contacts');}
                } )},
                {Team: KOVER.Ui('a', {
                    text: 'Команда',
                    Name: KOVER.Ui('img', {})
                    // click: function(){KOVER.GoTo('Team');}
                } )},
                {Map: KOVER.Ui('a', {
                    text: 'Мы на карте',
                    Name: KOVER.Ui('img', {})
                    // click: function(){KOVER.GoTo('Map');}
                } )},
                {News: KOVER.Ui('a', {
                    text: 'Новости',
                    Name: KOVER.Ui('img', {})
                    // click: function(){KOVER.GoTo('News');}
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
        BodyBlock_1: KOVER.Ui('p', {
            text: '{{BodyBlock_1}}'
        }),
        BodyBlock_2: KOVER.Ui('p', {
            text: '{{BodyBlock_2}}'
        }),
        BodyBlock_3: KOVER.Ui('p', {
            text: '{{BodyBlock_3}}'
        }),
        BodyBlock_4: KOVER.Ui('p', {
            text: '{{BodyBlock_4}}'
        }),
        BodyBlock_5: KOVER.Ui('p', {
            text: '{{BodyBlock_5}}'
        })
    });
});