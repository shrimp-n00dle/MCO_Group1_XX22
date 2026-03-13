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

module.exports = {
    RegisterUser,
    AddPost,
    AddComment,
}