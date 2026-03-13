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
        const query = { email: req.body.email, password: req.body.password };
        const options = {
            //Only return email and password if it exists
            projection: { _id: 0, email: 1, password: 1 },
        };

        const gotUser = await User.findOne(query, options);
        // Print the document returned by findOne()
        console.log(gotUser);

        if(gotUser){
            console.log("User exists!");
        } else {
            console.log("User DNE");
        }
    } catch{
        //console.log("Username or password is incorrect.");
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
    FindUser,
    AddPost,
    AddComment,
}