const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const locals = require('./locals');

const panelAuth = require('./middlewares/auth');
const translator = require('./middlewares/translator');

const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const cartRouter = require('./routes/cart');
const panelRouter = require('./routes/panel');
const langRouter = require('./routes/lang');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ secret: 'zal', resave: false, saveUninitialized: false }));

app.use((req, res, next) => {
    req.session.siteLang = req.session.siteLang || 'tr';
    res.locals.session = req.session;
    next();
});
app.use(translator.siteTranslator);
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/product', productRouter);
app.use('/profile', profileRouter);
app.use('/cart', cartRouter);
app.use('/panel', panelAuth.isAdmin, panelRouter);
app.use('/lang', langRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.detail = req.message;
    console.log(res.locals.detail);
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

locals.then(locals => {
    app.locals = locals;
    app.locals.translate = translator.translate;
});

module.exports = app;
