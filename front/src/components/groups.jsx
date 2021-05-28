import React from "react";
import { Segment, Select, Button, Header, Grid, Label } from "semantic-ui-react";
import { sortByNextDate } from "../utils/utils";
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

	groupSelectionElement() {
		return (
			<Segment secondary>
				{this.state.selectedGroupIndex !== null && (
					<Grid columns="equal" verticalAlign="middle">
						<Grid.Row centered>
							<Label circular color="teal">
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
			members = sortByNextDate(members);

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
			<Segment.Group>
				<Segment inverted color="teal" tertiary key={"test"}>
					<Grid columns="equal">
						<Grid.Column verticalAlign="middle">
							<Header inverted content="GROUPS"></Header>
						</Grid.Column>
						<Grid.Column>
							<Button inverted floated="right" circular onClick={(ev, data) => this.props.openJoinModal(true)} content="JOIN" />
							<Button inverted floated="right" circular onClick={(ev, data) => this.props.openCreateModal(true)} content="CREATE" />
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment secondary textAlign="center">
					<Select floating placeholder="Select your group" options={groups} onChange={(ev, data) => this.onSelectGroup(data)} />
				</Segment>

				{this.groupSelectionElement()}
			</Segment.Group>
		);
	}
}

export default Groups;
