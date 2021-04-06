import React from "react";
import LogoutButton from "./logoutButton";
import LoginButton from "./loginButton";
import axios from "axios";
import WishList from "./wishlist";
import Groups from "./groups";
import { Grid } from "semantic-ui-react";
import BirthdayModal from "./birthdayModal";

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false, firstLog: false, dateModalOpen: false };
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

    let user = (
      await axios.get(`http://localhost:1337/user/${this.state.googleId}`)
    ).data;

    if (user) {
      await this.loadDatas(user);
    } else {
      this.setState({ firstLog: true, modalOpen: true });
    }
  }

  async loadDatas(user) {
    let groupsRequestData = (
      await axios.get(`http://localhost:1337/group/${user._id}`)
    ).data;

    if (!groupsRequestData) return;

    let groups = [];
    for (let group of groupsRequestData) {
      let groupFormatted = { pseudo: group.pseudo, members: [] };
      const promises = group.users.map((member) => {
        return axios.get(`http://localhost:1337/user/objectID/${member}`);
      });
      await Promise.all(promises).then((values) => {
        groupFormatted.members = [...values.map((value) => value.data)];
      });

      groups.push(groupFormatted);
    }

    this.setState({
      wishList: user.wishList,
      dateOfBirth: user.dateOfBirth,
      currentUser: user,
      groups,
    });
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

  setModalVisible(value) {
    this.setState({ modalOpen: value });
    console.log(value)
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

    await this.loadDatas(user);
    this.setState({modalOpen: false})
  }

  loggedUI() {
    return (
      <div>
        <img src={this.state.imageUrl} alt="icon" />
        <p>Hello {this.state.givenName}</p>
        <Grid>
          <BirthdayModal modalOpen={this.state.modalOpen} onModalStateChange={this.setModalVisible.bind(this)} onConfirmDOB={this.createUser.bind(this)}></BirthdayModal>
          <WishList
            list={this.state.wishList}
            addItem={this.addItemToWishList.bind(this)}
            removeItem={this.removeItemToWishList.bind(this)}
          />
          <Groups
            list={this.state.groups}
            currentUser={this.state.currentUser}
            updateUI={this.loadDatas.bind(this)}
          ></Groups>
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
