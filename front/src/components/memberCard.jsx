import { List, Icon, Card } from "semantic-ui-react";

function MemberCard(props) {
	const upcomingDate = (rawDate) => {
		const date = new Date(rawDate);
		const today = new Date(Date.now());
		const monthOffset = 1;

		return today.getFullYear() === date.getFullYear() && today.getMonth() + monthOffset - date.getMonth() <= 1;
	};
	let wishes = props.wishList.map((wish, index2) => {
		return (
			<List.Item href={wish.url} target="_blank" key={index2}>
				<Icon name={wish.url ? "linkify" : ""}></Icon>
				{wish.item}
			</List.Item>
		);
	});
	return (
		<Card centered fluid key={props._id}>
			<Card.Content>
				<Card.Header>{props.name}</Card.Header>
				<Card.Meta>
					<span className="price">
						{new Date(props.dateOfBirth).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "long",
						})}
					</span>
					{upcomingDate(props.dateOfBirth) && <Icon color="teal" loading name="certificate" />}
				</Card.Meta>
			</Card.Content>
			<Card.Content>
				<List bulleted horizontal>
					{wishes.length === 0 ? <List.Item>No wishes 😑</List.Item> : wishes}
				</List>
			</Card.Content>
		</Card>
	);
}

export default MemberCard;
