const dotenv = require('dotenv');
dotenv.config();
const {connectToMongo} = require('./db/conn.js');
const {RegisterUser, UpdateUser, DeleteUser, AddPost, UpdatePost, DeletePost, AddComment, GiveLike} = require('./db/req.js');
// const {PopulateUsers} = require("./db/populate-db/populate-users.js");
// const {PopulatePosts} = require("./db/populate-db/populate-posts.js");

const express = require("express");
const multer = require('multer');
const session = require('express-session');
const { body } = require('express-validator');

const MongoStore = require('connect-mongo').default;
const upload = multer();
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require('path');

const port = process.env.SERVER_PORT;
const app = express();

app.use(session({
    secret: 'garnet-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL}),
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.engine("hbs", exphbs.engine({extname: 'hbs', defaultLayout: "main", layoutsDir: path.join(__dirname, "views/layouts"), partialsDir: path.join(__dirname, "views/partials")}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use('/js', express.static(__dirname + '/public/js')); 
app.use('/js', express.static(__dirname + '/db/models')); 

// Database Population ---------------------------------------------------------
// PopulateUsers();
// PopulatePosts();

// Helper Funcs ---------------------------------------------------------
Handlebars.registerHelper("matchString", function(val1, val2) {
    return val1 === val2;
});

// Server Operations --------------------------------------------------------------

app.post('/register', body('email').custom(async value => {
    const User = require("./db/models/user.js");
    const checkUser = await User.findOne({ email: value});
    if (checkUser) {
        throw new Error("Email already in use");
    }
}), upload.none(), async (req, res) => {
    RegisterUser(req, res);
    return;
});

app.post('/log-in', upload.none(), async (req, res) => {
    const User = require("./db/models/user.js");
    const userEmail = req.body.email;
    const checkUser = await User.findOne({ email: userEmail }).lean();
    

    if (checkUser) {
        // validate log in
        if (req.body.password === checkUser.password) {
            req.session.userID = checkUser._id;
            req.session.userUsername = checkUser.username;
            res.status(200).send("User logging in");
        } else {
            res.status(400).send("<p><b>Invalid log-in.</b> Email and password do not match.<p>");
        }
    } else {
        console.log("User does not exist.");
        res.status(400).send("<p><b>Invalid log-in.</b> Account could not be found.<p>");
        throw new Error("Email Not Found");
    }
    return;
});

app.post('/posting', upload.none(), async (req, res) => {
    return await AddPost(req, res);
});

app.post('/commenting', upload.none(), async (req, res) => {
    AddComment(req, res);
});

app.post('/liking', upload.none(), async (req, res) => {
    GiveLike(req, res);
});

app.post('/editProfile', upload.none(), async (req, res) => {
    return await UpdateUser(req, res);
});

app.post('/deleteAccount', upload.none(), async (req, res) => {
    return await DeleteUser(req, res);
});

app.post('/home', upload.none(), async (req, res) => {
    return await GiveLike(req, res);
});

app.post('/viewPost/:postID/edit', upload.none(), async (req, res) => {
    if (req.body.delete) {
        return await DeletePost(req, res);
    } else {
        return await UpdatePost(req, res);
    }
});

// Routing --------------------------------------------------------------
app.get('/', (req, res) => {
    res.redirect('/welcome');
});

app.get('/home', async (req, res) => {
    const Post = require("./db/models/post.js");
    const User = require("./db/models/user.js");
    const matchingPosts = await Post.find({}).populate('postOwner').lean();
    res.render("home", {
        title: "Home",
        posts: matchingPosts,
        sessionUser: req.session.userUsername
    });
});

app.get('/log-in', (req, res) => {
    res.render("log-in", {
        title: "Log In"
    });
});

app.get('/messageUser', (req, res) => {
    res.render("messageUser");
});

app.get('/posting', (req, res) => {
    res.render("posting", {
        title: "Post",
        sessionUser: req.session.userUsername
    });
});

app.get('/register', (req, res) => {
    res.render("register", {
        title: "Register"
    });
});

app.get('/welcome', (req, res) => {
    res.render("welcome", {
        title: "Welcome"
    });
});

app.get('/deleteAccount', (req, res) => {
    res.render("deleteAccount", {
        title: "Deleting Account"
    });
});

app.get('/viewProfile/:username', async (req, res) => {
    const Post = require("./db/models/post.js");
    const User = require("./db/models/user.js");
    
    const username = req.params.username;
    const profile = await User.findOne({username: username}).lean();
    const matchingPosts = await Post.find({postOwner: profile._id}).populate('postOwner').lean();

    if (!profile) {
        return res.status(404).send("User not found.");
    }

    res.render("viewProfile", {
        title: username,
        profile: profile,
        posts: matchingPosts,
        sessionUser: req.session.userUsername
    });
});

app.get('/viewPost/:postID', async (req,res) => {
    const postID = req.params.postID;
    const Post = require("./db/models/post.js");
    const User = require("./db/models/user.js");

    const matchingPost = await Post.findOne({_id: postID}).populate('postOwner').lean();
    res.render("viewPost", {
        title: "View Post",
        post: matchingPost,
        sessionUser: req.session.userUsername
    })
});

app.get('/viewPost/:postID/edit', async (req,res) => {
    const postID = req.params.postID;
    const Post = require("./db/models/post.js");
    const User = require("./db/models/user.js");

    const matchingPost = await Post.findOne({_id: postID}).populate('postOwner').lean();
    res.render("editPost", {
        title: "Edit Post",
        post: matchingPost,
        sessionUser: req.session.userUsername
    })
});

app.get('/editProfile', async (req,res) => {
    const User = require("./db/models/user.js");

    const userProfile = await User.findById({_id: req.session.userID}).lean();

    res.render("editProfile", {
        title: "Edit Profile",
        profile: userProfile,
        sessionUser: req.session.userUsername
    })
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