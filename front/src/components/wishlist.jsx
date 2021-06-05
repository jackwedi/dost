import { Grid, Segment, Button, Header, Card } from "semantic-ui-react";
import React from "react";
import WishCard from "./wishCard";

class Wishlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false,
			validInput: true,
			inputItem: null,
			checkingWord: false,
		};
	}

	onInputChange(value) {
		this.setState({ inputItem: value, validInput: true });
	}

	onRemoveItem(value) {
		this.props.removeItem(this.props.list[value]._id);
	}

	render() {
		let segments;
		if (this.props.list) {
			segments = this.props.list.map((wish, index) => {
				return <WishCard wish={wish.item} url={wish.url} key={index} onRemove={this.onRemoveItem.bind(this)} />;
			});
		}

		return (
			<Segment.Group>
				<Segment inverted color="green" tertiary>
					<Grid>
						<Grid.Column verticalAlign="middle" width="2">
							<Header inverted content="WISHLIST"></Header>
						</Grid.Column>
						<Grid.Column width="14">
							<Button inverted floated="right" circular onClick={(ev, data) => this.props.openWishModal(true)} content="ADD" />
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment secondary>
					<Card.Group>{segments}</Card.Group>
				</Segment>
			</Segment.Group>
		);
	}
}

export default Wishlist;
