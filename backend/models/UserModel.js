const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        reqired: true
    },
    email: {
        type: String,
        reqired: true,
        unique: true
    },
    password: {
        type: String,
        reqired: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},
    { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;