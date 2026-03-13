const {mongoose, Schema} = require('mongoose');

const PostSchema = new Schema(
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
        postTitle: {
            type: String,
            required: false,
            max: 100
        },
        postBody: {
            type: String,
            required: true,
            max: 300
        },
        mediaFile: {
            type: String,
            unique: false,
            required: false,
            min: 3,
            max: 200
        },
        likeCount: Number,
        followerCount: Number,
        dateCreated: String,
        replyList: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);