import WishList from "./wishlist";
import { Grid } from "semantic-ui-react";
import BirthdayModal from "./modals/birthdayModal.jsx";
import WishModal from "./modals/wishModal.jsx";

function WishWindow(props) {
	return (
		<Grid.Row>
			<Grid.Column>
				<BirthdayModal
					modalOpen={props.data.birthdayModelOpen}
					onModalStateChange={props.setDOBModalVisible}
					onConfirm={props.createUser}
				></BirthdayModal>
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
