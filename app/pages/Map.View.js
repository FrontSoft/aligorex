define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Map'),
        Regions = Page.layout({
            CloneSwipedMenu: KOVER.Ui({extend: 'SwipedMenu'}),
            MapAddres: KOVER.Ui('main')
        });

    Regions.MapAddres({
        AddressBlock: KOVER.Ui({
            foreach: '{{address}}',

            AddressTitle: KOVER.Ui('h3', {
                text: '{{title}}'
            }),
            AddressLink: KOVER.Ui('span', {
                text: '{{link}}',
                GoogleMap: '{{mapData}}'
            })
        })

    });

});