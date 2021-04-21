import Groups from "./groups";
import { Grid } from "semantic-ui-react";
import CreateGroupModal from "./modals/createGroupModal.jsx";
import JoinGroupModal from "./modals/joinGroupModal.jsx";

function GroupWindow(props) {
	return (
		<Grid.Row>
			<Grid.Column>
				<JoinGroupModal
					modalOpen={props.data.joinGroupModelOpen}
					onModalStateChange={props.setJoinGroupModalVisible}
					onConfirm={props.joinGroup}
				></JoinGroupModal>
				<CreateGroupModal
					modalOpen={props.data.createGroupModelOpen}
					onModalStateChange={props.setCreateGroupModalVisible}
					onConfirm={props.createGroup}
				></CreateGroupModal>

				<Groups
					list={props.data.groups}
					currentUser={props.data.currentUser}
					updateUI={props.updateGroupDatas}
					openCreateModal={props.setCreateGroupModalVisible}
					openJoinModal={props.setJoinGroupModalVisible}
				></Groups>
			</Grid.Column>
		</Grid.Row>
	);
}

export default GroupWindow;
