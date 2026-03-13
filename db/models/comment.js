const {mongoose, Schema} = require('mongoose');

const CommentSchema = new Schema(
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
        commentBody: {
            type: String,
            required: true,
            max: 300
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