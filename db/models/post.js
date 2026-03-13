const {mongoose, Schema} = require('mongoose');

const PostSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 100
        },
        profilePicture: {
            type: String,
            min: 3,
            max: 100
        },
        postTitle: {
            type: String,
            required: true,
            max: 100
        },
        postBody: {
            type: String,
            required: true,
            max: 300
        },
        mediaFile: {
            type: String,
            unique: true,
            required: true,
            min: 3,
            max: 200
        },
        likeCount: Number,
        followerCount: Number,
        dateCreated: String,
        //replyList: ['Comment'],
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);