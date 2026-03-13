const dotenv = require('dotenv');
dotenv.config();
const {connectToMongo} = require('./db/conn.js');
const {RegisterUser, FindUser, AddPost, AddComment} = require('./db/req.js');

const express = require("express");
const multer = require('multer');
const upload = multer();
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require('path');

// Temp data files
const {posts, nextID} = require('./data/posts');
const {profiles} = require('./data/profiles');
// End temp

const port = process.env.SERVER_PORT;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.engine("hbs", exphbs.engine({extname: 'hbs', defaultLayout: "main", layoutsDir: path.join(__dirname, "views/layouts"), partialsDir: path.join(__dirname, "views/partials")}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use('/js', express.static(__dirname + '/public/js')); 
app.use('/js', express.static(__dirname + '/db/models')); 

// Helper Funcs ---------------------------------------------------------
Handlebars.registerHelper("matchString", function(val1, val2) {
    return val1 === val2;
});

// Server Operations --------------------------------------------------------------

app.post('/register', upload.none(), async (req, res) => {
    RegisterUser(req, res);
});

app.post('/log-in', upload.none(), async (req, res) => {
    FindUser(req, res);
});

app.post('/posting', upload.array('media',5), async (req, res) => {
    AddPost(req, res);
});

app.post('/commenting', upload.none(), async (req, res) => {
    AddComment(req, res);
});

// Routing --------------------------------------------------------------
app.get('/', (req, res) => {
    res.redirect('/welcome');
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

// Connecting to the database -------------------------------------------
connectToMongo((err) => {
    if (err) {
        console.log("Error encountered: ");
        console.error(err);
        process.exit();
    }
    console.log("Successfully connected to MongoDB Server");
});

app.listen(port, () => {
    console.log("Server is now listening on port " + port);
});