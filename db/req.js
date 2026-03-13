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
        profilePicture: '',
        banner: '',
        bio: '',
        interestedGameGenres: [''],
        employmentStatus: ''
    }), err => {
        if(err) 
        res.render("register", {layout: false, error: "Something went wrong."});
        return err;
    }
}

async function FindUser(req, res){
    try {
        const User = require('./models/user.js');

        var userEmail = req.body.email;
        var typedPassword = req.body.password;
        const query = { email: userEmail, password: typedPassword };

        const gotUser = await User.findOne(query);

        if(gotUser){
            //Redirect user to home screen
        }
    } catch{
        console.log("Username and password do not exist.");
    }
}

async function AddPost(req,res)
{
    var date = new Date();
    var newPost = require("./models/post.js");
    await newPost.create({
        username : '',
        profilePicture: '',
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

async function AddComment(req,res)
{
    var newComment = require("./models/post.js");
    await newComment.create({
        username : req.body.username,
        profilePicture: '',
        commentBody: '',
        likeCount: 0,
        commentCount: 0,
        dateCreated: ''
    }), err => {
        if(err) 
        res.render("posting", {layout: false, error: "Something went wrong."});
        return err;
    }
}

module.exports = {
    RegisterUser,
    FindUser,
    AddPost,
    AddComment,
}