//配置代理之后要重启
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', {
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: { '^/api1': '' }
        })
    )
};
