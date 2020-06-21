const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false
    },
    avatar: {
        type: String
    },
    access_token: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
    contactNumber:{
        type: String
    },
     role: {
        type: String,
        default: 'buyer',
        enum:['buyer','seller']
    },
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
module.exports = mongoose.model('User', user);