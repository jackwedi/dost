const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user.model').userSchema;
const { ObjectId } = mongoose.Schema.Types;

const groupSchema = new Schema({
    type: mongoose.SchemaTypes.Mixed,
    pseudo: String,
    users: [ {
        type: ObjectId,
        ref: "User",
        unique: true,
        required: true
    }]
}, {
    timestamps: true
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group; 