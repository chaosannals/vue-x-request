const path = require('path');
const webpack = require('webpack');
const expressWs = require('express-ws');
const log4js = require('log4js');
log4js.configure({
    appenders: {
        file: {
            type: "dateFile",
            filename: path.resolve(__dirname, 'logs', 'demo'),
            alwaysIncludePattern: true,
            pattern: "yyyy-MM-dd.log",
            encoding: 'utf-8',
            maxLogSize: 30000
        },
        console: {
            type: 'console'
        },
    },
    categories: {
        default: {
            appenders: ['file'],
            level: 'all'
        },
        file: {
            appenders: ['file'],
            level: 'all'
        },
        console: {
            appenders: ['console'],
            level: log4js.levels.ALL
        },
    }
});
const logger = log4js.getLogger();

module.exports = {
    configureWebpack: () => {
        return {
            entry: '@/main.js',
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, 'demo'),
                    '@source': path.resolve(__dirname, 'source'),
                },
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.VERSION': new Date().getTime(),
                }),
            ],
        };
    },
    devServer: {
        before: (app) => {
            logger.info('before port ============>');
            app.ws('/some/sock', (ws) => {
                logger.info('websock open: ==============>');
                ws.send('连接成功');
                ws.on('message', message => {
                    logger.info(`websock message: ==============> ${message}`);
                    ws.send(`接到了: ${message}`);
                });
            });
        },
        after: (app, server, compiler) => {
            compiler.hooks.beforeCompile.tap('set-env', ( /** compilation */ ) => {
                let time = new Date().getTime();
                logger.info('before compile(beforeCompile) =>>>>>>>>>>', time);
                compiler.apply(new webpack.DefinePlugin({
                    'process.env.VERSION': time,
                }));
            });
        },
        onListening: server => {
            const port = server.listeningApp.address().port;
            logger.info('listing port:', port, ' ============>');
        },
        setup: app => {
            logger.info('on setup: ==============>');
            expressWs(app);
            app.get('/some/get', (req, res) => {
                res.json({
                    custom: 'response get'
                });
            });
            app.post('/some/post', (req, res) => {
                res.json({
                    custom: 'response post'
                });
            });
            app.get('/some/jsonp', (req, res) => {
                let result = JSON.stringify({
                    custom: 'response jsonp'
                });
                let callback = req.query.callback || 'callback';
                res.end(`${callback}(${result});`);
            });
        },
    }
};