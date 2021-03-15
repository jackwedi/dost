const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    wishList: [String],
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    userSchema
};