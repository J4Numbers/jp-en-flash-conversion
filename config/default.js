module.exports = {
    app: {
        http2: {
            enabled: false,
            key: '/path/to/key/file',
            cert: '/path/to/cert/file',
        },
        name: 'ui-jp-to-eng-flashcards',
        hostname: 'localhost',
        port: 8080,
        dictionary: 'file',
        flashcards: 'memory',
    },
    locale: {
        source: 'dictionary',
    },
    dictionary: {
        file: {},
    },
    flashcards: {
        memory: {},
    },
    functionality: {},
    nunjucks: {
        options: {},
    },
    logger: {
        level: 'info',
    },
};
