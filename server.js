if (process.env.TRACE) {
    require('./libs/trace');
}
var koa = require('koa');
var app = koa();
var config = require('config');
var path = require('path');
var fs = require('fs');
var rewrite = require('koa-rewrite');

var config = require('config');

app.keys = [config.secret];


var middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
    app.use(require('./middlewares/' + middleware));
});

fs.readdirSync(__dirname).forEach(function (file) {
    if (fs.statSync(path.join(__dirname, file)).isDirectory())
        app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
})

var booksRoutes = require('./api/routes/booksRoutes');
app.use(booksRoutes.routes());

app.listen(3000, function(err) {
    console.log('server listen: ' + config.server.port);
});