import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 100
        },
        lastName: {
            type: String,
            required: true,
            max: 100
        },
        email: {
            type: String,
            unique: true,
            required: true,
            min: 3,
            max: 200
        },
        username: {
            type: String,
            required: true,
            min: 3,
            max: 100
        },
        password: {
            type: String,
            required: true,
            min: 3,
            max: 100
        },
        followerCount: Number,
        profilePicture: {
            type: String,
            min: 3,
            max: 100
        },
        banner: {
            type: String,
            min: 3,
            max: 100
        },
        bio: {
            type: String,
            min: 3,
            max: 100
        },
        interestedGameGenres: [String],
        employmentStatus: {
            type: String,
            max: 50
        },
    }, 
    {
        timestamps: true
    }
);

const User = model('User', UserSchema);
export default User;