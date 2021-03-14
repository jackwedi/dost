const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    type: mongoose.SchemaTypes.Mixed,
    pseudo: String,
    dateOfBirth: Date,
    wishList: [String],
    // required: true,
    // unique: true
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    userSchema
};