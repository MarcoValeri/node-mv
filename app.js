const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

const app = express();

// DotEnv configuration
dotenv.config();

// Routes
const adminRoutes = require('./routes/adminRoutes');
const articleRoutes = require('./routes/articleRoutes');
const homeRoutes = require('./routes/homeRoutes');

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
app.use(homeRoutes);

const PORT = process.env.PORT || process.env.SERVER_PORT;

app.listen(PORT);