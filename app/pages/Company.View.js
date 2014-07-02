define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Company'),
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