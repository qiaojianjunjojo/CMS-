var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { checkAPP, checkAdmin, checkUser } = require('./util/middleware') //引入中间件

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

//创建express实例
var app = express();
//express解决跨域问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', checkAPP, indexRouter);
app.use('/users', usersRouter);
app.use('/admin', [checkAPP, checkUser, checkAdmin], adminRouter)

module.exports = app;
