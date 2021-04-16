const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		googleID: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		dateOfBirth: {
			type: Date,
			required: true,
		},
		wishList: [{ item: String, url: String }],
	},
	{
		unique: true,
	}
);

const User = mongoose.model("User", userSchema);
module.exports = {
	User,
	userSchema,
};
