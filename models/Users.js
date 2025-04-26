import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    profilePic: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default:''
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User