import React from "react";
import LogoutButton from "./logoutButton";
import LoginButton from "./loginButton";
import axios from "axios";
import WishList from "./wishlist";
import Groups from "./groups";
import { Grid, Header } from "semantic-ui-react";
import BirthdayModal from "./birthdayModal";
import CreateGroupModal from "./createGroupModal";
import JoinGroupModal from "./joinGroupModal";

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false, firstLog: false };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogin(res) {
    console.log(`LOGGED IN 👌`, res.profileObj);

    this.setState({
      isLogged: true,
      // email
      // familyName
      // givenName
      // googleId
      // imageUrl
      // name
      ...res.profileObj,
    });

    await this.updateUserDatas();
  }

  async updateGroupDatas() {
    let groupsRequestData = (
      await axios.get(`http://localhost:1337/group/user/${this.state.currentUser._id}`)
    ).data;

    if (!groupsRequestData) {
      console.log("NO GROUPS")
      return;
    };

    let groups = [];
    for (let group of groupsRequestData) {
      let groupFormatted = { pseudo: group.pseudo, members: [], sharedId: group.sharedId };
      const promises = group.users.map((member) => {
        return axios.get(`http://localhost:1337/user/objectID/${member}`);
      });
      await Promise.all(promises).then((values) => {
        groupFormatted.members = [...values.map((value) => value.data)];
      });

      groups.push(groupFormatted);
    }

    this.setState({
      groups,
    });
  }

  async updateUserDatas() {
    let user = (
      await axios.get(`http://localhost:1337/user/${this.state.googleId}`)
    ).data;

    if (user) {
      this.setState({         
        wishList: user.wishList,
        dateOfBirth: user.dateOfBirth,
        currentUser: user
      }, async () => {
        await this.updateGroupDatas();
      });
    } else {
      this.setState({ firstLog: true, birthdayModelOpen: true });
    }

  }

  async addItemToWishList(value) {
    let request = (
      await axios.post(
        `http://localhost:1337/user/addwish/${this.state.googleId}/${value}`
      )
    ).data;
    this.setState({ wishList: request.wishList });
  }

  async removeItemToWishList(value) {
    let request = (
      await axios.post(
        `http://localhost:1337/user/removewish/${this.state.googleId}/${value}`
      )
    ).data;
    this.setState({ wishList: request.wishList });
  }

  handleLogout() {
    console.log("LOGGED OUT 👋");
    this.setState({ isLogged: false });
  }

  handleFailing(log) {
    console.log(log);
  }

  setDOBModalVisible(value) {
    this.setState({ birthdayModelOpen: value });
  }

  setCreateGroupModalVisible(value) {
    this.setState({ createGroupModelOpen: value });
  }

  setJoinGroupModalVisible(value) {
    this.setState({ joinGroupModelOpen: value });
  }

  async createUser(dateOfBirth) {
    // Only when entered Date
    console.log("NEW USER");
    const createUserResponse = await axios.post(
      `http://localhost:1337/user`,
      {
        googleID: this.state.googleId,
        name: this.state.givenName,
        dateOfBirth
      }
    );

    const user = createUserResponse.data;

    await this.updateUserDatas();
    this.setState({birthdayModelOpen: false})
  }

  async createGroup(group) {
    const createGroup = await axios.post(
      `http://localhost:1337/group/create`,
      {
        pseudo: group
      }
    );
    const joinRequest = await axios.post(`http://localhost:1337/group/join`,  
    {
      sharedId: createGroup.data.sharedId,
      userId: this.state.currentUser._id

    });

    await this.updateGroupDatas();
    this.setState({createGroupModelOpen: false})

  }

  async joinGroup(group) {
    if (this.state.groups.filter((group) => group.sharedId === group).length > 0) {
      console.log("ALREADY IN GROUP");
      return;
    }
    const joinRequest = await axios.post(`http://localhost:1337/group/join`,
    {
      sharedId: group,
      userId: this.state.currentUser._id

    });
    
    await this.updateGroupDatas();
    this.setState({joinGroupModelOpen: false})

  }

  async groupExists(groupId) {
    const request = await axios.get(`http://localhost:1337/group/${groupId.replace("#", "~")}`);
    return request.data;
  }

  loggedUI() {
    return (
      <div>
        
        <Header><img src={this.state.imageUrl} alt="icon" />Hello {this.state.givenName}</Header>
        <Grid centered> 
          <Grid.Row>

          <Grid.Column >
            <BirthdayModal modalOpen={this.state.birthdayModelOpen} onModalStateChange={this.setDOBModalVisible.bind(this)} onConfirm={this.createUser.bind(this)}></BirthdayModal>
            <WishList
              list={this.state.wishList}
              addItem={this.addItemToWishList.bind(this)}
              removeItem={this.removeItemToWishList.bind(this)}
            />
          </Grid.Column>
          </Grid.Row>
        <Grid.Row>

          <Grid.Column >
            <JoinGroupModal modalOpen={this.state.joinGroupModelOpen} onModalStateChange={this.setJoinGroupModalVisible.bind(this)} onConfirm={this.joinGroup.bind(this)}></JoinGroupModal>
            <CreateGroupModal modalOpen={this.state.createGroupModelOpen} onModalStateChange={this.setCreateGroupModalVisible.bind(this)} onConfirm={this.createGroup.bind(this)}></CreateGroupModal>
            <Groups
              list={this.state.groups}
              currentUser={this.state.currentUser}
              updateUI={this.updateGroupDatas.bind(this)}
              openCreateModal={this.setCreateGroupModalVisible.bind(this)}
              openJoinModal={this.setJoinGroupModalVisible.bind(this)}
            ></Groups>
          </Grid.Column>
        </Grid.Row>

        </Grid>
        <br />
        <br />
        <br />
        <LogoutButton
          onSuccess={this.handleLogout}
          onFailure={this.handleFailing}
        />
      </div>
    );
  }

  notLoggedUI() {
    return (
      <div>
        <p>Hello {`please log`}</p>
        <LoginButton
          onSuccess={this.handleLogin}
          onFailure={this.handleFailing}
        />
      </div>
    );
  }

  render() {
    return this.state.isLogged ? this.loggedUI() : this.notLoggedUI();
  }
}

export default LoginControl;
