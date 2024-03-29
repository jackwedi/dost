import { Card, Container, Grid, Item, Segment, Header } from "semantic-ui-react";
import { sortByNextDate } from "../utils/utils";
import MemberCard from "./memberCard";
const COLORS = ["blue", "brown", "green", "olive", "orange", "pink", "purple", "red", "teal", "violet", "yellow"];

function Home(props) {
	let upcomingEvents = [];
	COLORS.sort(() => Math.random() - 0.5);
	const getRandomColor = () => {
		const rdColor = COLORS.shift();
		COLORS.push(rdColor);
		return rdColor;
	};

	if (props.upcomingEvents) {
		for (const group of props.upcomingEvents) {
			group.users = sortByNextDate(group.users);
			if (group.users) {
				const members = group.users.map((member, index) => {
					return <MemberCard name={member.name} wishList={member.wishList} dateOfBirth={member.dateOfBirth} _id={member._id} key={index} />;
				});

				if (group.users.length === 0) continue;

				const groupUpcomingEvents = (
					<Grid.Column>
						<Segment.Group>
							<Segment color={getRandomColor()} inverted tertiary>
								<Header>{group.pseudo}</Header>
							</Segment>
							<Segment secondary>
								<Card.Group>{members}</Card.Group>
							</Segment>
						</Segment.Group>
					</Grid.Column>
				);

				upcomingEvents.push(groupUpcomingEvents);
			}
		}
	}

	return (
		<Grid>
			<Grid.Row>
				<Container style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
					<Item>
						<Header size="huge" content={"👋"} />
					</Item>
					<Card>
						<Card.Content>
							<Card.Header>{props.data.givenName}</Card.Header>
							<Card.Meta>{new Date(props.data.dateOfBirth).toLocaleDateString()}</Card.Meta>
							<Card.Content extra>{`Member of ${props.data.groups ? props.data.groups.length : 0} groups`}</Card.Content>
							<Card.Content extra>{`${props.data.wishList ? props.data.wishList.length : 0} wishes`}</Card.Content>
						</Card.Content>
					</Card>
				</Container>
			</Grid.Row>

			<Grid.Row centered>
				<Segment circular inverted>
					<Header content={upcomingEvents.length > 0 ? "UPCOMING EVENTS" : "Nothing expected in the next days 😥"} />
				</Segment>
			</Grid.Row>
			{upcomingEvents.length > 0 && <Grid.Row columns={upcomingEvents.length}>{upcomingEvents}</Grid.Row>}
		</Grid>
	);
}

export default Home;
