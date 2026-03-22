const {mongoose, Schema} = require('mongoose');

const CommentSchema = new Schema(
    {
        commentOwner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        commentBody: {
            type: String,
            required: true,
            max: 300
        },
        postParent: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        likeCount: Number,
        dateCreated: String,
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Comment', CommentSchema);