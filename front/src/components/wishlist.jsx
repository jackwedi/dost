import { Grid, Segment, SegmentGroup, Button, Table, Header, Icon } from "semantic-ui-react";
import React from "react";

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
				return (
					<Table.Row key={index}>
						<Table.Cell>{wish.item}</Table.Cell>
						<Table.Cell>
							{wish.url && (
								<a href={wish.url} target="_blank" rel="noreferrer">
									<Icon link name="linkify"></Icon>
								</a>
							)}
						</Table.Cell>
						<Table.Cell collapsing>
							<Button size="tiny" inverted color="red" icon="remove" circular onClick={(ev, data) => this.onRemoveItem(index)}></Button>
						</Table.Cell>
					</Table.Row>
				);
			});
		}

		return (
			<div>
				<SegmentGroup>
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
						<Table textAlign="left" size="small" unstackable>
							<Table.Body>{segments}</Table.Body>
						</Table>
					</Segment>
				</SegmentGroup>
			</div>
		);
	}
}

export default Wishlist;
