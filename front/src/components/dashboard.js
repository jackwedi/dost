import WishList from "./wishlist";
import Groups from "./groups";
import { Grid, Header } from "semantic-ui-react";
import BirthdayModal from "./birthdayModal";
import CreateGroupModal from "./createGroupModal";
import JoinGroupModal from "./joinGroupModal";

function Dashboard(props) {
  return (
    <Grid centered padded='vertically' style={{"padding-top": 4.5 + "em"}}> 

      <Grid.Row>
        <Grid.Column >
          <BirthdayModal modalOpen={props.data.birthdayModelOpen} onModalStateChange={props.setDOBModalVisible} onConfirm={props.createUser}></BirthdayModal>
          <WishList
            list={props.data.wishList}
            addItem={props.addItemToWishList}
            removeItem={props.removeItemToWishList}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column >
          <JoinGroupModal modalOpen={props.data.joinGroupModelOpen} onModalStateChange={props.setJoinGroupModalVisible} onConfirm={props.joinGroup}></JoinGroupModal>
          <CreateGroupModal modalOpen={props.data.createGroupModelOpen} onModalStateChange={props.setCreateGroupModalVisible} onConfirm={props.createGroup}></CreateGroupModal>
          <Groups
            list={props.data.groups}
            currentUser={props.data.currentUser}
            updateUI={props.updateGroupDatas}
            openCreateModal={props.setCreateGroupModalVisible}
            openJoinModal={props.setJoinGroupModalVisible}
          ></Groups>
        </Grid.Column>
      </Grid.Row>

    </Grid>
  );
}

export default Dashboard;