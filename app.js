const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require('path');

const {posts, nextID} = require('./data/posts');
const {profiles} = require('./data/profiles');

const port = 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.engine("hbs", exphbs.engine({extname: 'hbs', defaultLayout: "main", layoutsDir: path.join(__dirname, "views/layouts"), partialsDir: path.join(__dirname, "views/partials")}));
app.set("view engine", "hbs");
app.set("views", "./views");

// Helper Funcs
Handlebars.registerHelper("matchString", function(val1, val2) {
    return val1 === val2;
});

// Routing
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render("home", {
        title: "Home",
        posts,
    });
});

app.get('/log-in', (req, res) => {
    res.render("log-in");
});

app.get('/messageUser', (req, res) => {
    res.render("messageUser");
});

app.get('/posting', (req, res) => {
    res.render("posting");
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.get('/welcome', (req, res) => {
    res.render("welcome");
});

app.get('/viewProfile/:username', (req, res) => {
    const username = req.params.username;
    const profile = profiles.find((p) => p.username === username);

    if (!profile) {
        return res.status(404).send("User not found.");
    }

    res.render("viewProfile", {
        title: username,
        profile,
        posts,
    });
});

app.listen(port, () => {
    console.log("Server is now listening on port " + port);
});