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
        ContactsBlock1_header: KOVER.Ui('h3', {
            text: '{{ContactsBlock1_header}}'
        }),
        ContactsBlock1_address: KOVER.Ui('p', {
            text: 'Адрес: ',
            ContactsBlock1_address_value: KOVER.Ui('span', {
                text: '{{ContactsBlock1_address_value}}'
            })
        }),
        ContactsBlock1_phone: KOVER.Ui('p', {
            text: 'Телефон: ',
            ContactsBlock1_phone_value: KOVER.Ui('a', {
                text: '{{ContactsBlock1_phone_value}}',
                attr: {href: 'tel:+357-22441958'}
            })
        }),
        ContactsBlock1_email: KOVER.Ui('p', {
            text: 'Email: ',
            ContactsBlock1_email_value: KOVER.Ui('a', {
                text: '{{ContactsBlock1_email_value}}',
                attr: {href: 'mailto:office@aligorex.com'}
            })
        }),
        ContactsBlock2_header: KOVER.Ui('h3', {
            text: '{{ContactsBlock2_header}}'
        }),
        ContactsBlock2_address: KOVER.Ui('p', {
            text: 'Адрес: ',
            ContactsBlock2_address_value: KOVER.Ui('span', {
                text: '{{ContactsBlock2_address_value}}'
            })
        }),
        ContactsBlock2_phone: KOVER.Ui('p', {
            text: 'Телефон: ',
            ContactsBlock2_phone_value: KOVER.Ui('a', {
                text: '{{ContactsBlock2_phone_value}}',
                attr: {href: 'tel:+7-499-755-50-08'}
            })
        }),
        ContactsBlock2_email: KOVER.Ui('p', {
            text: 'Email: ',
            ContactsBlock2_email_value: KOVER.Ui('a', {
                text: '{{ContactsBlock2_email_value}}',
                attr: {href: 'mailto:moscow@aligorex.com'}
            })
        }),
        ContactsBlock3_header: KOVER.Ui('h3', {
            text: '{{ContactsBlock3_header}}'
        }),
        ContactsBlock3_address: KOVER.Ui('p', {
            text: 'Адрес: ',
            ContactsBlock3_address_value: KOVER.Ui('span', {
                text: '{{ContactsBlock3_address_value}}'
            })
        }),
        ContactsBlock3_phone: KOVER.Ui('p', {
            text: 'Телефон: ',
            ContactsBlock3_phone_value: KOVER.Ui('a', {
                text: '{{ContactsBlock3_phone_value}}',
                attr: {href: 'tel:+371-293-66-966'}
            })
        }),
        ContactsBlock3_email: KOVER.Ui('p', {
            text: 'Email: ',
            ContactsBlock3_email_value: KOVER.Ui('a', {
                text: '{{ContactsBlock3_email_value}}',
                attr: {href: 'mailto:latvia@aligorex.com'}
            })
        })
    });
});