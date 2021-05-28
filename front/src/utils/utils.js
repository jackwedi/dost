export function sortByNextDate(tab) {
	return (
		tab
			// Add 1 year to the already passed birthday of this year
			.map((member) => {
				let today = new Date(Date.now());
				let birthday = new Date(member.dateOfBirth);
				birthday.setFullYear(today.getFullYear());

				let computedBirthday = birthday.getDate() + birthday.getMonth() * 30;
				let computedToday = today.getDate() + today.getMonth() * 30;
				if (computedBirthday - computedToday < 0) {
					birthday.setFullYear(today.getFullYear() + 1);
				}
				member.testBirthday = birthday;
				return member;
			})
			// Sort by next birthdates
			.sort((a, b) => new Date(a.testBirthday) - new Date(b.testBirthday))
	);
}
