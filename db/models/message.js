const {mongoose, Schema} = require('mongoose');

const messageSchema = new Schema(
    {
        threadParent: {
            type: Schema.Types.ObjectId,
            ref: 'Thread'
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        messageBody: {
            type: String,
            required: true,
            trim: true
        },
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Message', messageSchema);