import { Card, Container, Grid, Item, Segment, Header } from "semantic-ui-react";

function Home(props) {
	return (
		<Grid.Row>
			<Container style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
				<Item header={`Hello`}></Item>
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
