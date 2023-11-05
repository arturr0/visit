const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');
const subpageRouter1 = require('./routes/service1'); // Import the subpage router
const subpageRouter2 = require('./routes/service2');
const subpageRouter3 = require('./routes/service3');
const app = express();
const session = require('express-session');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});
app.use('/public', express.static(path.join(__dirname, 'public'), { 'Content-Type': 'text/javascript' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(flash());

app.use('/', routes); // Use the main router
app.use('/service1', subpageRouter1);
app.use('/service2', subpageRouter2);
app.use('/service3', subpageRouter3);
app.use(
    session({
        // It holds the secret key for session
        secret: "I am girl",
        // Forces the session to be saved back to the session store
        resave: true,
        // Forces a session that is "uninitialized" to be saved to the store
        saveUninitialized: false,
        cookie: {
            path: '/', // Set the path to root URL
        }
    })
);


// Get function in which send session as routes.
app.get('/', function (req, res, next) {
    console.log(req.session.views)
    if (req.session.views) {
        // Increment the number of views.
        req.session.views++
        console.log(req.session.views)
        // Print the views.
        res.write('<p> No. of views: '
            + req.session.views + '</p>')
        console.log(req.session.views)
        res.end()
    } else {
        req.session.views = 1
        console.log(req.session.views)
        res.end(' New session is started')
    }
})
module.exports = app;
