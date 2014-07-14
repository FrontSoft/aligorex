define(['kover'], function(KOVER){

    var Page = KOVER.NewPage('Contacts'),
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
        BodyBlock_2: KOVER.Ui('p', {
            text: '{{BodyBlock_2}}'
        }),
        ContactsBlock: KOVER.Ui({
            foreach: '{{contactqq}}',

            ContactsBlock_header: KOVER.Ui('h3', {
                text: '{{header}}'
            }),
            ContactsBlock_address: KOVER.Ui('p', {
                text: 'Адрес: ',
                ContactsBlock_address_value: KOVER.Ui('span', {
                    text: '{{address}}'
                })
            }),
            ContactsBlock_phone: KOVER.Ui('p', {
                text: 'Телефон: ',
                ContactsBlock1_phone_value: KOVER.Ui('a', {
                    text: '{{phone}}',
                    attr: {href: 'tel:{{href}}'}
                })
            }),
            ContactsBlock_email: KOVER.Ui('p', {
                text: 'Email: ',
                ContactsBlock1_email_value: KOVER.Ui('a', {
                    text: '{{email}}',
                    attr: {href: 'mailto:'+'{{email}}'}
                })
            })
        })
    });
});