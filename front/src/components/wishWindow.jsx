import WishList from "./wishlist";
import { Grid, Header } from "semantic-ui-react";
import WishModal from "./modals/wishModal.jsx";

function WishWindow(props) {
	return (
		<Grid.Row>
			<Header textAlign="center" size="huge" content={"🎁"} />

			<Grid.Column>
				<WishList
					list={props.data.wishList}
					addItem={props.addItemToWishList}
					removeItem={props.removeItemFromWishList}
					openWishModal={props.setWishModalVisible}
				/>

				<WishModal
					modalOpen={props.data.wishModelOpen}
					onModalStateChange={props.setWishModalVisible}
					onConfirm={props.addItemToWishList}
				></WishModal>
			</Grid.Column>
		</Grid.Row>
	);
}

export default WishWindow;
