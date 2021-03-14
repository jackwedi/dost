const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user.model').userSchema;

const groupSchema = new Schema({
    type: mongoose.SchemaTypes.Mixed,
    pseudo: String,
    users: [userSchema],
    // required: true,
    // unique: true
}, {
    timestamps: true
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group; 