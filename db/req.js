const { check } = require('express-validator');
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
            req.session.userUsername = req.body.username;
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
        if (req.body.employmentStatus && req.body.employmentStatus !== 'Keep current') {
            currentUser.employmentStatus = req.body.employmentStatus;
        } 
        if (req.body.firstName) {
            currentUser.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            currentUser.lastName = req.body.lastName;
        }
        if (req.body.email) {
            var checkUser = await User.exists({ email: req.body.email}).lean();
            if (!checkUser || checkUser._id === req.session.userID) {
                currentUser.email = req.body.email;
            } else {
                return res.status(400).send("<p>Email is already in use by a different existing account.<p>");
            }
        } if (req.body.password) {
            currentUser.password = req.body.password;
        }
        if (req.body.interestedGameGenres) {
            var gameGenresString = req.body.interestedGameGenres
            var gameGenreArray = gameGenresString.split(/\s*,\s*/);
            currentUser.interestedGameGenres = gameGenreArray;
        }

        try {
            await currentUser.save();
            return res.status(200).send("<p>Successfully updated profile/account details!<p>");
        } catch (e) {
            return res.status(400).send("<p>Something went wrong. Try again.<p>");
        }
    } else {
        return res.status(400).send("<p>User not found<p>");
    }
}

async function DeleteUser(req, res) {
    try {
        var User = require('./models/user.js');
        const deleted = await User.findByIdAndDelete(req.session.userID);
        return res.status(200).send("<p>Successfully deleted account.</p>");
    } catch (e) {
        return res.status(400).send("<p>Something went wrong. Try again.<p>");
    }
}

async function AddPost(req,res)
{
    var date = new Date();
    var newPost = require("./models/post.js");
    var User = require("./models/user.js");
    var checkUser = await User.findById(req.session.userID).lean();

    var postTitle = '';
    var mediaFile = '';
    if (req.body.postTitle) {
        postTitle = req.body.postTitle;
    }
    if (req.body.mediaFile) {
        mediaFile = req.body.mediaFile;
    }

    if (checkUser) {
        await newPost.create({
            postOwner: checkUser._id, 
            postTitle: postTitle,
            postBody: req.body.postBody,
            mediaFile: mediaFile,
            likeCount: 0,
            commentCount: 0,
            dateCreated: date
        }), err => {
            if(err) 
            res.render("posting", {layout: false, error: "Something went wrong."});
            return err;
        }

        return res.status(200).send("<p>Post made.</p>");
    } else {
        return res.status(400).send("<p>User not found.</p>");
    }
}

async function UpdatePost(req,res)
{
    var date = new Date();
    var Post = require("./models/post.js");
    const checkPost = await Post.findById(req.body.postID);

    if (checkPost) {
        var postTitle = '';
        var mediaFile = '';
        if (req.body.postTitle) {
            postTitle = req.body.postTitle;
        }
        if (req.body.mediaFile) {
            mediaFile = req.body.mediaFile;
        }

        try {
            await Post.findByIdAndUpdate(req.body.postID, {
                postTitle: postTitle,
                postBody: req.body.postBody,
                mediaFile: mediaFile,
                dateCreated: date
            });

            return res.status(200).send("<p>Successfully updated post.<p>");
        } catch (e) {
            return res.status(400).send("Failed to update post.");
        }
    } else {
        return res.status(400).send("Failed to find post.");
    }
}

async function DeletePost(req, res) {
    try {
        var Post = require('./models/post.js');
        const deleted = await Post.findByIdAndDelete(req.body.postID);
        return res.status(200).send("<p>Successfully deleted post.</p>");
    } catch (e) {
        return res.status(400).send("<p>Something went wrong. Try again.<p>");
    }
}

async function AddComment(req,res)
{
    var date = new Date();
    var newComment = require("./models/comment.js");
    await newComment.create({
        commentOwner: req.session.userID,
        commentBody: req.body.commentBody,
        postParent: req.body.postID,
        likeCount: 0,
        dateCreated: date
    }), err => {
        if(err) 
        return res.sendStatus(400);
    }

    return res.sendStatus(200);
}

async function GiveLike(req,res)
{
    var Post = require("./models/post.js");
    const checkPost = await Post.findById(req.body.postID);

    if (checkPost) {
        if (checkPost.likeList.includes(req.session.userID)) {
            try {
                await Post.findByIdAndUpdate(req.body.postID, {
                    $inc: { likeCount: -1},
                    $pull: {likeList: req.session.userID}
                });

                return res.sendStatus(200);
            } catch (e) {
                console.log("Failed to unlike.");
                return res.status(400).send("Failed to unlike.");
            }
        } else {
            try {
                await Post.findByIdAndUpdate(req.body.postID, {
                    $inc: { likeCount: 1},
                    $push: {likeList: req.session.userID}
                });

                return res.sendStatus(200);
            } catch (e) {
                console.log("Failed to like.");
                return res.status(400).send("Failed to like.");
            }
        }
    } else {
        console.log("Failed to find post.");
        return res.status(400).send("Failed to find post.");
    }
}

async function FollowUser(req, res) {
    var Follow = require("./models/follow.js");
    var User = require("./models/user.js");

    const checkFollow = await Follow.exists({ followingUser: req.session.userID, followedUser: req.body.userID});

    if (checkFollow) {
        const deleted = await Follow.findOneAndDelete({ followingUser: req.session.userID, followedUser: req.body.userID});
        
        try {
            await User.findByIdAndUpdate(req.body.userID, {
                $inc: { followerCount: -1}
            });
        } catch (e) {
            return res.status(400).send("Something went wrong.");
        }
        
        return res.sendStatus(200);
    } else {
        await Follow.create({
            followingUser: req.session.userID,
            followedUser: req.body.userID,
        }), err => {
            if(err) 
            res.render("/viewProfile", {layout: false, error: "Something went wrong."});
            return err;
        }

        try {
            await User.findByIdAndUpdate(req.body.userID, {
                $inc: { followerCount: 1}
            });
        } catch (e) {
            return res.status(400).send("Something went wrong.");
        }

        return res.sendStatus(200);
    }
}

module.exports = {
    RegisterUser,
    UpdateUser,
    DeleteUser,
    AddPost,
    UpdatePost,
    DeletePost,
    AddComment,
    GiveLike,
    FollowUser
}