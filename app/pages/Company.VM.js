define(['kover'], function(KOVER){

    KOVER.Render('Company');

    return {
        HeaderTitle: 'О компании',
        BodyTextBlocks: [
            'ALIGOREX CONSULT LTD –международная консалтинговая компания, чей штат состоит из компитентных,\
                преданных своему делу молодых специалистов. Наша цель – предоставление высококачественного сервиса с\
                оптимальной комбинацией ЦЕНА-КАЧЕСТВО-СКОРОСТЬ ОБСЛУЖИВАНИЯ.',
            'Компания ALIGOREX CONSULT LTD на рынке консалтинговых услуг с 2009г. Головной офис компании\
                располагается в г. Никосия (Кипр). Для удобства наших клиентов были открыты представительства в г.\
                Москва (Россия) и в г. Рига (Латвия). Со временем мы планируем расширить свое присутствие в России и\
                странах СНГ.',
            'C июня 2013 г. ALIGOREX CONSULT LTD —является официальным лицензированным провайдером\
                корпоративных услуг в Объединенных Арабских Эмиратах.',
            'На сегодняшний день мы оказываем наши услуги в более чем 30 юрисдикциях, среди которых страны Европы,\
                Азии и Америки. Наиболее популярные направления: ОАЭ, Великобритания, Швейцария, Белиз, Сейшеллы,\
                БВО, Сингапур и Кипр.',
            'ALIGOREX CONSULT LTD является членом Международной ассоциации International Law&Tax\
                Association (ILTA) и CYPRUS-RUSSIA BUSINESS ASSOCIATION.'
        ],
        MenuItems: [
            {title: 'О компании', path: 'Company'},
            {title: 'Работы', path: 'Works'},
            {title: 'Услуги компании', path: 'Services'},
            {title: 'Контакты', path: 'Contacts'},
            {title: 'Команда', path: 'Team'},
            {title: 'Мы на карте', path: 'Map'},
            {title: 'Новости', path: 'News'}
        ]
    };
});