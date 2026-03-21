const {mongoose, Schema} = require('mongoose');

// followingUser is following followedUser

const FollowSchema = new Schema(
    {
        followingUser: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        followedUser: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Follow', FollowSchema);