const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const groupSchema = new Schema(
	{
		type: mongoose.SchemaTypes.Mixed,
		pseudo: String,
		sharedId: String,
		users: [
			{
				type: ObjectId,
				ref: "User",
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
