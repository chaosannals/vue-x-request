const path = require('path');

module.exports = {
    configureWebpack: {
        entry: '@/main.js',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'demo'),
                '@source': path.resolve(__dirname, 'source'),
            },
        },
    },
};