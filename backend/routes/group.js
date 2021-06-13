const router = require("express").Router();
const Group = require("../models/group.model");
const User = require("../models/user.model").User;
const _ = require("lodash");

router.route("/:sharedId").get(async (req, res) => {
	const param = req.params;
	const group = await Group.findOne({ sharedId: param.sharedId.replace("~", "#") }).populate("users");
	res.send(group);
});

router.route("/user/:userId").get(async (req, res) => {
	Group.find({ users: req.params.userId })
		.then((value) => {
			console.log("Found groups :", value);
			res.send(value);
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post(async (req, res) => {
	const param = req.body;
	try {
		const group = await Group.create({ pseudo: param.pseudo });
		const queryRes = await Group.findOneAndUpdate(
			{
				_id: group._id,
			},
			{ sharedId: `${param.pseudo}#${group._id.toString().slice(8, 18)}` },
			{ new: true }
		);
		res.send(queryRes);
		console.log(`CREATED GROUP ${queryRes.pseudo} : ${queryRes.sharedId}`);
	} catch (e) {
		console.log("E", e);
	}
});

router.route("/join").post(async (req, res) => {
	const param = req.body;
	console.log(req);
	const queryRes = await Group.findOneAndUpdate(
		{
			sharedId: param.sharedId.replace("~", "#"),
		},
		{ $push: { users: param.userId } },
		{ new: true }
	);
	return res.send(queryRes);
});

router.route("/createSantaDraw").post(async (req, res) => {
	const param = req.body;
	const queryRes = await Group.findOne({
		sharedId: param.sharedId.replace("~", "#"),
	}).populate("users");

	const shuffledIds = shuffle(queryRes.users.map((user) => user._id.toString()));
	const availableUsers = [...shuffledIds];

	let resultMap = shuffledIds.map((giverId) => {
		const previousDraws = queryRes.users.find((user) => user._id == giverId).santaDraws.map((draw) => draw.userId);
		const receiverId = _.without(availableUsers, giverId, ...previousDraws).pop();
		_.pull(availableUsers, receiverId);
		return { giverId, receiverId: receiverId ?? null };
	});

	if (resultMap.some((draw) => draw.receiverId === null)) {
		// Full loop need to re-draw without avoiding previous year draws
		resultMap = shuffledIds.map((giverId) => {
			const receiverId = _.without(availableUsers, giverId).pop();
			_.pull(availableUsers, receiverId);
			return { giverId, receiverId: receiverId ?? null };
		});
	}

	const currentYear = new Date().getFullYear();

	const updatepromises = [];
	for (draw of resultMap) {
		updatepromises.push(
			User.findOneAndUpdate(
				{
					_id: draw.giverId,
				},
				{ $pull: { santaDraws: { year: currentYear } } }
			),
			User.findOneAndUpdate(
				{
					_id: draw.giverId,
				},
				{ $push: { santaDraws: { year: currentYear, userId: draw.receiverId } } },
				{ new: true }
			)
		);
	}

	await Promise.all(updatepromises);
	return res.send(resultMap);
});

router.route("/createmockusers").post(async (req, res) => {
	const usersCreated = [];
	for (let i = 1011; i < 1291; i++) {
		usersCreated.push(
			await User.create({
				googleID: `${i}`,
				name: `USER${i}`,
				dateOfBirth: Date.now(),
				wishlist: [""],
			})
		);
	}

	await Promise.all(usersCreated);

	await Group.findOneAndUpdate(
		{
			sharedId: "mock#baf4320b2c".replace("~", "#"),
		},
		{ $push: { users: usersCreated } },
		{ new: true }
	);
	return res.send(usersCreated);
});

module.exports = router;

function shuffle(array) {
	var m = array.length,
		t,
		i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}
