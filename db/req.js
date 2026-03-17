const { mongoose } = require('mongoose');

async function RegisterUser(req, res) {
    var newUser = require('./models/user.js');
    await newUser.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        followerCount: 0,
        profilePicture: '/img/default_pfp.png',
        banner: '/img/default_banner.png',
        bio: '',
        interestedGameGenres: [''],
        employmentStatus: ''
    }), err => {
        if(err) 
        res.render("register", {layout: false, error: "Something went wrong."});
        return err;
    }
}

async function UpdateUser(req, res) {
    var User = require('./models/user.js');
    var currentUser = await User.findById(req.session.userID);

    if (currentUser) {
        if (req.body.username) {
            currentUser.username = req.body.username;
            req.session.userUsername = currentUser.username;
        } 
        if (req.body.profilePicture) {
            currentUser.profilePicture = req.body.profilePicture;
        } 
        if (req.body.banner) {
            currentUser.banner = req.body.banner;
        } 
        if (req.body.bio) {
            currentUser.bio = req.body.bio;
        }
        if (req.body.employmentStatus) {
            currentUser.employmentStatus = req.body.employmentStatus;
        } 

        await currentUser.save();
        return;
    } else {
        res.status(400);
        return;
    }

    return;
}

async function AddPost(req,res)
{
    var date = new Date();
    var newPost = require("./models/post.js");
    var User = require("./models/user.js");
    var checkUser = await User.findById(req.session.userID).lean();

    await newPost.create({
        username: checkUser.username,
        profilePicture: checkUser.profilePicture, 
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
        mediaFile: '',
        likeCount: 0,
        commentCount: 0,
        dateCreated: date
    }), err => {
        if(err) 
        res.render("posting", {layout: false, error: "Something went wrong."});
        return err;
    }
}

async function AddComment(req,res)
{
    var date = new Date();
    var newPost = require("./models/post.js");
    await newPost.create({
        username : req.body.username,
        profilePicture: '',
        postTitle: '',
        postBody: '',
        mediaFile: '',
        likeCount: 0,
        dateCreated: date
    }), err => {
        if(err) 
        res.render("posting", {layout: false, error: "Something went wrong."});
        return err;
    }
}

async function GiveLike(req,res)
{
    var newLike = require("./models/like.js");
    await newLike.create({
        likeCount: req.likeCount + 1
    }), err => {
        if(err) 
        res.render("posting", {layout: false, error: "Something went wrong."});
        return err;
    }
}

module.exports = {
    RegisterUser,
    UpdateUser,
    AddPost,
    AddComment,
    GiveLike
}