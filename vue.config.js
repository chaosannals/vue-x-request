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
    devServer: {
        setup: app => {
            app.get('/some/get', (req, res) => {
                res.json({
                    custom: 'response get'
                });
            });
            app.post('/some/post', (req, res) => {
                res.json({
                    custom: 'response post'
                });
            })
        }
    }
};