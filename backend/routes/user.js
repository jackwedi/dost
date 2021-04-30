const router = require("express").Router();
const User = require("../models/user.model").User;
const Group = require("../models/group.model");

router.route("/:googleId").get(async (req, res) => {
	const user = await User.findOne({
		googleID: req.params.googleId,
	});
	console.log("FOUND", user, req.body);
	return res.send(user);
});

router.route("/objectID/:objectID").get(async (req, res) => {
	const user = await User.findById(req.params.objectID).exec();
	console.log("FOUND", user);
	return res.send(user);
});

router.route("/addwish").post(async (req, res) => {
	const params = req.body;
	console.log(params);
	const user = await User.findOneAndUpdate(
		{
			googleID: params.googleId,
		},
		{
			$push: { wishList: { item: params.item, url: params.url } },
		},
		{ new: true }
	);
	console.log("Updated WISHLIST", user.name, user.wishList);
	return res.send(user);
});

router.route("/removewish/:googleId/:itemId").post(async (req, res) => {
	const user = await User.findOneAndUpdate(
		{
			googleID: req.params.googleId,
		},
		{
			$pull: { wishList: { _id: req.params.itemId } },
		},
		{ new: true }
	);
	console.log("Updated WISHLIST", user.name, user.wishList);
	return res.send(user);
});

router.route("/").post(async (req, res) => {
	const param = req.body;
	const userAlreadyRegistered = await User.findOne({
		googleID: param.googleID,
	});

	if (userAlreadyRegistered) {
		console.log(`User ${param.name} is already registered in the database`);
		return res.send(userAlreadyRegistered);
	}

	User.create(
		{
			googleID: param.googleID,
			name: param.name,
			dateOfBirth: param.dateOfBirth,
			wishlist: param.wishlist || [""],
		},
		(err, doc) => {
			if (err) return res.status(400).json("Error: " + err);
			return res.send(doc);
		}
	);
});

router.route("/upcomingevents/:userId").get(async (req, res) => {
	try {
		const groups = await Group.find({ users: req.params.userId });

		const friends = groups.map((group) => group.users.map((userId) => userId.toString())).flat();
		const uniqueFriends = friends.filter((value, index, self) => {
			return self.indexOf(value) === index;
		});

		let resList = await User.find({ _id: { $in: uniqueFriends } });

		resList = resList.filter((user) => {
			return upcomingDate(user.dateOfBirth);
		});
		console.log(resList);

		return res.send(sortByNextDate(resList));
	} catch (e) {
		console.log(e);
	}
});

const upcomingDate = (rawDate) => {
	const today = new Date(Date.now());
	const testDate = new Date(rawDate);
	const monthOffset = 12;
	return testDate.getMonth() - today.getMonth() <= monthOffset;
};

const sortByNextDate = (tab) => {
	return (
		tab
			// Add 1 year to the already passed birthday of this year
			// .map((member) => {
			// 	let tempMember = { ...member };
			// 	console.log(tempMember);
			// 	let birthday = new Date(member.dateOfBirth);
			// 	let today = new Date(Date.now());

			// 	let computedBirthday = birthday.getDate() + birthday.getMonth() * 30;
			// 	let computedToday = today.getDate() + today.getMonth() * 30;
			// 	if (computedBirthday - computedToday < 0) {
			// 		birthday = new Date(birthday.setFullYear(today.getFullYear() + 1));
			// 	}
			// 	// tempMember.dateOfBirth = birthday;
			// 	return tempMember;
			// })
			// Sort by next birthdates
			.sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth))
	);
};

module.exports = router;
