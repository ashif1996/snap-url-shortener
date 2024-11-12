require('dotenv').config();

const connectToDatabase = require('./config/dbConfig');
connectToDatabase();

const express = require('express');
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{ secure: false },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));
app.use(nocache());

const indexRoutes = require('./routes/indexRoutes');
app.use('/', indexRoutes);

app.use((req, res, next) => {
    const locals = { title: "404 | Page Not Found" };
    return res.status(404).render("404", {
        locals,
        layout: "layout/errorLayout",
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    const locals = { title: "500 | Internal Server Error" };
    return res.status(500).render('internalError', {
        locals,
        layout: 'layout/errorLayout',
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

module.exports = app;