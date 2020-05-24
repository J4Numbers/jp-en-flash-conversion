module.exports = {
    app: {
        http2: {
            enabled: false,
            key: '/path/to/key/file',
            cert: '/path/to/cert/file',
        },
        name: 'ui-jp-to-eng-flashcards',
        hostname: 'localhost',
        port: 8090,
    },
    locale: {
        source: 'dictionary',
    },
    functionality: {},
    nunjucks: {
        options: {},
    },
    logger: {
        level: 'info',
    },
};
