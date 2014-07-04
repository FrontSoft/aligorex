define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Services_corporate'),
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
        BlockTitle_1: KOVER.Ui('h3', {
            text: '{{BlockTitle_1}}'
        }),
        BodyBlock_1_p_1: KOVER.Ui('p', {
            text: '{{BodyBlock_1}}'
        }),
        BodyBlock_1_p_2: KOVER.Ui('p', {
            text: '{{BodyBlock_2}}'
        }),
        BodyBlock_1_p_3: KOVER.Ui('ul', {
            items: [
                {text: '{{BodyBlock_1_p_3_item_1}}'},
                {text: '{{BodyBlock_1_p_3_item_2}}'},
                {text: '{{BodyBlock_1_p_3_item_3}}'},
                {text: '{{BodyBlock_1_p_3_item_4}}'},
                {text: '{{BodyBlock_1_p_3_item_5}}'},
                {text: '{{BodyBlock_1_p_3_item_6}}'},
                {text: '{{BodyBlock_1_p_3_item_7}}'},
                {text: '{{BodyBlock_1_p_3_item_8}}'},
                {text: '{{BodyBlock_1_p_3_item_9}}'}
            ]
        }),
        BlockTitle_2: KOVER.Ui('h3', {
            text: '{{BlockTitle_2}}'
        }), 
        BodyBlock_2_p_1: KOVER.Ui('p', {
            text: '{{BodyBlock_2_p_1}}'
        }),
        BodyBlock_2_p_2: KOVER.Ui('p', {
            text: '{{BodyBlock_2_p_2}}'
        }),
        BodyBlock_2_p_3: KOVER.Ui('p', {
            BodyBlock_2_p_3_strong: KOVER.Ui('strong', {text: '{{BodyBlock_2_p_3_strong}}'}
            text: '{{BodyBlock_2_p_3}}'
        }),
            BodyBlock_2_p_4: KOVER.Ui('p', {
            BodyBlock_2_p_4_strong: KOVER.Ui('strong', {text: '{{BodyBlock_2_p_4_strong}}'}
            text: '{{BodyBlock_2_p_4}}'
        }),
        BlockTitle_3: KOVER.Ui('h3', {
            text: '{{BlockTitle_3}}'
        }),
        BodyBlock_3_p_1: KOVER.Ui('p', {
            text: '{{BodyBlock_3_p_1}}'
        }),
        BodyBlock_3_p_2: KOVER.Ui('p', {
            text: '{{BodyBlock_3_p_2}}'
        }),
        BodyBlock_3_p_3: KOVER.Ui('p', {
            text: '{{BodyBlock_3_p_3}}'
        }),
        BodyBlock_3_p_4: KOVER.Ui('ul', {
            items: [
                {BodyBlock_3_p_4_item_1: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_1}}'})},
                {BodyBlock_3_p_4_item_2: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_2}}'})},
                {BodyBlock_3_p_4_item_3: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_3}}'})},
                {BodyBlock_3_p_4_item_4: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_4}}'})},
                {BodyBlock_3_p_4_item_5: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_5}}'})},
                {BodyBlock_3_p_4_item_6: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_6}}'})},
                {BodyBlock_3_p_4_item_7: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_7}}'})},
                {BodyBlock_3_p_4_item_8: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_8}}'})},
                {BodyBlock_3_p_4_item_9: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_9}}'})},
                {BodyBlock_3_p_4_item_10: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_9}}'})},
                {BodyBlock_3_p_4_item_11: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_9}}'})},
                {BodyBlock_3_p_4_item_12: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_9}}'})},
                {BodyBlock_3_p_4_item_13: KOVER.Ui('a', {text: '{{BodyBlock_3_p_4_item_9}}'})},
            ]
        }),
        BlockTitle_4: KOVER.Ui('h3', {
            text: '{{BlockTitle_4}}'
        }),
        BodyBlock_4_p_1: KOVER.Ui('p', {
            text: '{{BodyBlock_4_p_1}}'
        }),
    });
});