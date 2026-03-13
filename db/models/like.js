const {mongoose, Schema} = require('mongoose');

const LikeSchema = new Schema(
    {
        likeCount: Number,
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', LikeSchema);