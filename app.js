const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dotenv = require('dotenv');
dotenv.config();
const {connectToMongo} = require('./db/conn.js');
const {
    RegisterUser, UpdateUser, DeleteUser, 
    AddPost, UpdatePost, DeletePost, 
    AddComment, UpdateComment, DeleteComment, 
    GiveLike, FollowUser,
    MakeThread, MakeMessage
} = require('./db/req.js');

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

var mongoURL = "mongodb+srv://halyvasi17_db_admin:fiZdX1fSNpMPDsBh@garnetdb.omcka8g.mongodb.net/?appName=GarnetDB"

app.use(session({
    secret: 'garnet-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURL}),
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

// Helper Funcs ---------------------------------------------------------
Handlebars.registerHelper("matchString", function(val1, val2) {
    return String(val1) === String(val2);
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

app.post('/editProfile', upload.none(), async (req, res) => {
    return await UpdateUser(req, res);
});

app.post('/deleteAccount', upload.none(), async (req, res) => {
    return await DeleteUser(req, res);
});

app.post('/home', upload.none(), async (req, res) => {
    return await GiveLike(req, res);
});

app.post('/home/:postID/comment', upload.none(), async (req, res) => {
    return await AddComment(req, res);
});

app.post('/viewPost/:postID/:commentID/edit', upload.none(), async (req, res) => {
    if (req.body.delete) {
        return await DeleteComment(req, res);
    } else {
        return await UpdateComment(req, res);
    }
});

app.post('/viewPost/:postID/edit', upload.none(), async (req, res) => {
    if (req.body.delete) {
        return await DeletePost(req, res);
    } else {
        return await UpdatePost(req, res);
    }
});

app.post('/viewProfile/:username', upload.none(), async (req, res) => {
    return FollowUser(req, res);
});

app.post('/message/:userID', upload.none(), async (req, res) => {
    return MakeMessage(req, res);
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

app.get('/home/:postID/comment', async (req, res) => {
    const Post = require("./db/models/post.js");
    const User = require("./db/models/user.js");
    const matchingPosts = await Post.find({}).populate('postOwner').lean();
    var postID = req.params.postID
    res.render("comment", {
        title: "Home",
        postId: postID,
        posts: matchingPosts,
        sessionUser: req.session.userUsername
    });
});

app.get('/log-in', (req, res) => {
    res.render("log-in", {
        title: "Log In"
    });
});

app.get('/message', async (req, res) => {
    const User = require("./db/models/user.js");
    const Thread = require("./db/models/thread.js");
    const Message = require("./db/models/message.js");
    const userThreads = await Thread.find({$or: [
        { user1: req.session.userID },
        { user2: req.session.userID }
    ]}).populate('user1 user2 mostRecent').populate({ path: 'mostRecent allMessages', populate: {path: 'sender', strictPopulate: false}}).lean();

    res.render("messageUser", {
        title: "Messages",
        sessionUser: req.session.userUsername,
        user: req.session.userID,
        messageThreads: userThreads
    });
});

app.get('/message/:userID', async (req, res) => {
    var userID = req.params.userID;

    const User = require("./db/models/user.js");
    const Thread = require("./db/models/thread.js");
    const Message = require("./db/models/message.js");
    const profile = await User.findOne({_id: userID}).lean();

    var checkThread = await Thread.exists({ $and: [
        { $or: [
            { user1: req.session.userID },
            { user2: req.session.userID }
        ]},
        { $or: [
            { user1: profile._id },
            { user2: profile._id }
        ]}
    ]});

    if (!checkThread) {
        await MakeThread(req, res, profile._id);
    }

    var thisThread = await Thread.findOne({ $and: [
        { $or: [
            { user1: req.session.userID },
            { user2: req.session.userID }
        ]},
        { $or: [
            { user1: profile._id },
            { user2: profile._id }
        ]}
    ]}).populate('user1 user2').populate({ path: 'allMessages', populate: {path: 'sender', strictPopulate: false}}).lean();

    const userThreads = await Thread.find({$or: [
        { user1: req.session.userID },
        { user2: req.session.userID }
    ]}).populate('user1 user2').populate({ path: 'mostRecent allMessages', populate: {path: 'sender', strictPopulate: false}}).lean();

    res.render("messageUser", {
        title: "Messages",
        sessionUser: req.session.userUsername,
        user: req.session.userID,
        reciever: profile,
        messageThreads: userThreads,
        messageThread: thisThread
    });
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
    const Follow = require("./db/models/follow.js");
    
    const username = req.params.username;
    const profile = await User.findOne({username: username}).lean();
    const matchingPosts = await Post.find({postOwner: profile._id}).populate('postOwner').lean();

    if (!profile) {
        return res.status(404).send("User not found.");
    }

    const checkFollow = await Follow.exists({ followingUser: req.session.userID, followedUser: profile._id});
    var isFollowing = false;
    if (checkFollow) {
        isFollowing = true;
    } 

    var interestedGameGenres = profile.interestedGameGenres;
    interestedGameGenres = interestedGameGenres.join(", ");

    res.render("viewProfile", {
        title: username,
        profile: profile,
        posts: matchingPosts,
        followingThisUser: isFollowing,
        interestedGameGenres: interestedGameGenres,
        sessionUser: req.session.userUsername
    });
});

app.get('/viewPost/:postID', async (req,res) => {
    const postID = req.params.postID;
    const Post = require("./db/models/post.js");
    const User = require("./db/models/user.js");
    const Comment = require("./db/models/comment.js");

    const matchingPost = await Post.findOne({_id: postID}).populate('postOwner').lean();
    const comments = await Comment.find({postParent: postID}).populate('postParent commentOwner').lean();
    res.render("viewPost", {
        title: "View Post",
        post: matchingPost,
        comments: comments,
        sessionUser: req.session.userUsername
    })
});

app.get('/viewPost/:postID/:commentID/edit', async (req,res) => {
    const postID = req.params.postID;
    const commentID = req.params.commentID;
    const Post = require("./db/models/post.js");
    const User = require("./db/models/user.js");
    const Comment = require("./db/models/comment.js");

    const matchingPost = await Post.findOne({_id: postID}).populate('postOwner').lean();
    const comments = await Comment.find({postParent: postID}).populate('postParent commentOwner').lean();
    const matchingComment = await Comment.find({_id: commentID}).lean();
    res.render("editComment", {
        title: "View Post",
        post: matchingPost,
        comments: comments,
        postID: postID,
        commentID: commentID,
        focusedComment: matchingComment,
        sessionUser: req.session.userUsername
    })
});

app.get('/viewPost/:postID/edit', async (req,res) => {
    const postID = req.params.postID;
    const Post = require("./db/models/post.js");
    const User = require("./db/models/user.js");

    const matchingPost = await Post.findOne({_id: postID}).populate('postOwner').lean();

    if (matchingPost.postOwner._id == req.session.userID) {
        res.render("editPost", {
            title: "Edit Post",
            post: matchingPost,
            sessionUser: req.session.userUsername
        })
    } else {
        res.redirect("/home");
    }
});

app.get('/editProfile', async (req,res) => {
    const User = require("./db/models/user.js");

    const userProfile = await User.findById({_id: req.session.userID}).lean();
    var interestedGameGenres = userProfile.interestedGameGenres;
    interestedGameGenres = interestedGameGenres.join(", ");
    
    res.render("editProfile", {
        title: "Edit Profile",
        profile: userProfile,
        interestedGameGenres: interestedGameGenres,
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