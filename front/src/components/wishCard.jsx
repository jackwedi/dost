import { Button, Icon, Card } from "semantic-ui-react";

function WishCard(props) {
	const getLinkDiv = (url) => {
		return (
			<a href={url} target="_blank" rel="noreferrer">
				<Icon link name="linkify"></Icon>LINK
			</a>
		);
	};

	return (
		<Card centered fluid key={props._id}>
			<Card.Content>
				<Card.Header>
					{props.wish ?? 0}

					<Button
						floated="right"
						size="tiny"
						inverted
						color="red"
						icon="remove"
						circular
						onClick={(ev, data) => props.onRemove(props.index)}
					></Button>
					<Card.Description></Card.Description>
				</Card.Header>
			</Card.Content>
			<Card.Content>{props.url ? getLinkDiv(props.url) : "No link"}</Card.Content>
		</Card>
	);
}

export default WishCard;
