define(['kover'], function(KOVER){


    return {
        HeaderTitle: 'Услуги компании',
        BodyBlock_1: 'ALIGOREX CONSULT LTD— международная консалтинговая компания, предоставляющая в рамках своей деятельности следующий перечень услуг:',
        BlockLinks: KOVER.ObserveArray([
            {
                LinkTitle: 'Корпоративный сервис и сопутствующие услуги',
                LinkPath: 'Services_corporate'
            },
            {
                LinkTitle: 'Международное налоговое планирование',
                LinkPath: 'Services_tax_planning'
            },
            {
                LinkTitle: 'Глобальный доступ к банковским услугам',
                LinkPath: 'Services_global_banking'
            },
            {
                LinkTitle: 'Ведение бухгалтерского учета и услуги аудита — при поддержке нашего лицензированного партнера Canaima Tax & Audit LTD',
                LinkPath: 'Services_audit'
            },
            {
                LinkTitle: 'Консультации по любым операциям с недвижимостью и связанные с этим рекомендации в получении вида на жительство в Латвии, Греции и наКипре — при содействии нашего партнера компании ProLandExpert Ltd',
                LinkPath: 'Services_realty_consult'
            },
            {
                LinkTitle: 'Широкий доступ к альтернативным инвестициям',
                LinkPath: 'Services_alternative_investment'
            },
            {
                LinkTitle: 'Юридические консультации в области рисков и налогового планирования, при участии одной из крупнейших юридических компаний на Кипре с  успешной практикой более 10 лет',
            },
            {
                LinkTitle: 'Консультации и услуги в сфере информационных технологий при сотрудничестве с нашими партнерами Aligorex IT Services',
                LinkPath: 'Services_IT_consult'
            }
        ])
    };
});