const {mongoose, Schema} = require('mongoose');

const PostSchema = new Schema(
    {
        postOwner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
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
            max: 200
        },
        likeCount: Number,
        commentCount: Number,
        dateCreated: String,
        likeList: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);