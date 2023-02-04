const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const sessions = require('express-session');

const app = express();

// DotEnv configuration
dotenv.config();

// Session
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: 'this is my secret key',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());

// Routes
const adminRoutes = require('./routes/adminRoutes');
const articleRoutes = require('./routes/articleRoutes');
const homeRoutes = require('./routes/homeRoutes');
const pageRoutes = require('./routes/pageRoutes');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));

// View
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));

// Routers
app.use(adminRoutes);
app.use(articleRoutes);
app.use(pageRoutes);
app.use(homeRoutes);

const PORT = process.env.PORT || process.env.SERVER_PORT;

app.listen(PORT);
