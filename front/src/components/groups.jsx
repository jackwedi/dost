import React from "react";
import { Segment, SegmentGroup, Select, Button, Header, Grid, Label } from "semantic-ui-react";
import MemberCard from "./memberCard";

class Groups extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedGroupIndex: null };
	}

	async onSelectGroup(data) {
		await this.props.updateUI();
		this.setState({ selectedGroupIndex: data.value });
	}

	sortByNextDate(tab) {
		return (
			tab
				// Add 1 year to the already passed birthday of this year
				.map((member) => {
					let tempMember = { ...member };
					let birthday = new Date(member.dateOfBirth);
					let today = new Date(Date.now());

					let computedBirthday = birthday.getDate() + birthday.getMonth() * 30;
					let computedToday = today.getDate() + today.getMonth() * 30;
					if (computedBirthday - computedToday < 0) {
						birthday = new Date(birthday.setFullYear(today.getFullYear() + 1));
					}
					tempMember.dateOfBirth = birthday;
					return tempMember;
				})
				// Sort by next birthdates
				.sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth))
		);
	}

	upcomingDate(rawDate) {
		const date = new Date(rawDate);
		const today = new Date(Date.now());
		const monthOffset = 1;

		return today.getFullYear() === date.getFullYear() && today.getMonth() + monthOffset - date.getMonth() <= 1;
	}

	groupSelectionElement() {
		return (
			<Segment secondary>
				{this.state.selectedGroupIndex !== null && (
					<Grid columns="equal" verticalAlign="middle">
						<Grid.Row centered>
							<Label circular color="teal" tertiary>
								<i>{this.props.list[this.state.selectedGroupIndex]?.sharedId}</i>
							</Label>
						</Grid.Row>
					</Grid>
				)}
				{this.membersSegments()}
			</Segment>
		);
	}

	membersSegments() {
		let members;

		if (this.props.list && this.state.selectedGroupIndex !== null) {
			// Removes the current User
			members = this.props.list[this.state.selectedGroupIndex].members;
			// .filter((user) => user.googleID !== this.props.currentUser.googleID);
			// Sorting
			members = this.sortByNextDate(members);

			// UI
			members = members.map((member, index) => {
				return <MemberCard name={member.name} wishList={member.wishList} dateOfBirth={member.dateOfBirth} _id={member._id} />;
			});
		}

		return members ?? null;
	}

	render() {
		const groups = this.props.list?.map((group, index) => {
			return { key: group.pseudo, text: group.pseudo, value: index };
		});

		return (
			<div>
				<SegmentGroup>
					<Segment inverted color="teal" tertiary key={"test"}>
						<Grid columns="equal">
							<Grid.Column verticalAlign="middle">
								<Header inverted content="GROUPS"></Header>
							</Grid.Column>
							<Grid.Column textAlign="center">
								<Select floating placeholder="Select your group" options={groups} onChange={(ev, data) => this.onSelectGroup(data)} />
							</Grid.Column>
							<Grid.Column>
								<Button inverted floated="right" circular onClick={(ev, data) => this.props.openJoinModal(true)} content="JOIN" />
								<Button inverted floated="right" circular onClick={(ev, data) => this.props.openCreateModal(true)} content="CREATE" />
							</Grid.Column>
						</Grid>
					</Segment>

					{this.groupSelectionElement()}
				</SegmentGroup>
			</div>
		);
	}
}

export default Groups;
