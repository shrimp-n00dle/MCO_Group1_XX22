const {mongoose, Schema} = require('mongoose');

const threadSchema = new Schema(
    {
        user1: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        user2: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        allMessages: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }],
        mostRecent: {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Thread', threadSchema);