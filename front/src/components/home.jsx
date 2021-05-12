import { Card, Container, Grid, Item, Segment, Header, Image, SegmentGroup } from "semantic-ui-react";
import MemberCard from "./memberCard";
import { CarouselProvider, Slider } from "pure-react-carousel";

function Home(props) {
	const members = !props.data.upcomingEvents
		? null
		: props.data.upcomingEvents.map((member, index) => {
				return <MemberCard wishList={member.wishList} name={member.name} dateOfBirth={member.dateOfBirth} index={index} />;
		  });

	return (
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
				<Segment.Group>
					<Segment>
						<Header content="UPCOMING EVENTS"></Header>
					</Segment>
					<Segment>{props.data.groups ? props.data.groups.toString() : 0}</Segment>
				</Segment.Group>
			</Container>
		</Grid.Row>
	);
}

export default Home;
