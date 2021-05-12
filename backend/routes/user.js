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
		console.log("U FRIENDS", uniqueFriends);

		let resList = await User.find({ _id: { $in: uniqueFriends } });

		let test = resList.map((member) => {
			let { name, dateOfBirth, wishList } = member;
			return { name, dateOfBirth, wishList };
		});

		test = test.filter((user) => {
			return upcomingDate(user.dateOfBirth);
		});
		console.log(test, 1);
		const sortedDates = sortByNextDate(test);
		// console.log(sortedDates, 2);
		return res.send(sortedDates);
	} catch (e) {
		console.log(e);
	}
});

const upcomingDate = (rawDate) => {
	const today = new Date(Date.now());
	const testDate = new Date(rawDate);
	const monthOffset = 4;
	const diffMonth = testDate.getMonth() - today.getMonth();
	const diffDay = testDate.getDate() - today.getDate();
	return diffMonth >= 0 && diffDay >= 0 && diffMonth <= monthOffset;
};

const sortByNextDate = (tab) => {
	// Sort by next birthdates
	let today = new Date(Date.now());

	return tab.sort((a, b) => {
		const computedDateA = formatDateToBirthday(a.dateOfBirth, today);
		const computedDateB = formatDateToBirthday(b.dateOfBirth, today);
		return computedDateA - computedDateB;
	});
};

const formatDateToBirthday = (date, today) => {
	let birthday = new Date(date);
	birthday.setFullYear(today.getFullYear());
	let computedBirthday = date.getDate() + date.getMonth() * 30;
	if (computedBirthday < today.getDate() + today.getMonth() * 30) {
		birthday = new Date(birthday.setFullYear(today.getFullYear() + 1));
	}

	return birthday;
};

module.exports = router;
