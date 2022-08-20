window.klaroConfig = {
    version: 2,
    cookieName: 'klaro-i18n',
    lang: 'en',
    acceptAll: true,
    default: true,
    hideDeclineAll: true,
    poweredBy:
        'https://github.com/KIProtect/klaro/blob/master/dist/configs/i18n.js',
    translations: {
        zz: {
            privacyPolicyUrl: 'https://blog.liorp.dev/terms/',
        },
        en: {
            consentModal: {
                title: 'Consent',
                description:
                    'I use cookies to gain important analytic info in order to provide you with the best experience possible.',
            },
            poweredBy: 'view config',
            ok: 'OK',
            purposes: {
                analytics: 'Analytics',
            },
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
        },
    },
    services: [
        {
            name: 'googleAnalytics',
            title: 'Google Analytics',
            purposes: ['analytics'],
        },
    ],
}
