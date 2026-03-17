const {mongoose, Schema} = require('mongoose');

const CommentSchema = new Schema(
    {
        username: {
            type: String,
            required: false,
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
            required: false,
            max: 300
        },
        postParent: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        likeCount: Number,
        followerCount: Number,
        dateCreated: String,
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', CommentSchema);