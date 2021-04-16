import React from "react";
import axios from "axios";
import Dashboard from "./dashboard";
import { Container, Header, Menu, Grid, Icon } from "semantic-ui-react";
import LogoutButton from "./logoutButton";
import LoginButton from "./loginButton";
import { Tween } from "react-gsap";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLogged: false, firstLog: false };
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.arrowIcon = null;
		this.myTween = null;
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
			console.log("NO GROUPS");
			return;
		}

		let groups = [];
		for (let group of groupsRequestData) {
			let groupFormatted = {
				pseudo: group.pseudo,
				members: [],
				sharedId: group.sharedId,
			};
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
		let user = (await axios.get(`http://localhost:1337/user/${this.state.googleId}`)).data;

		if (user) {
			console.log(user.wishList);
			this.setState(
				{
					wishList: user.wishList,
					dateOfBirth: user.dateOfBirth,
					currentUser: user,
				},
				async () => {
					await this.updateGroupDatas();
				}
			);
		} else {
			this.setState({ firstLog: true, birthdayModelOpen: true });
		}
	}

	async addItemToWishList(item, url) {
		let request = (
			await axios.post(`http://localhost:1337/user/addwish`, {
				googleId: this.state.googleId,
				item,
				url,
			})
		).data;
		this.setState({ wishList: request.wishList, wishModelOpen: false });
	}

	async removeItemFromWishList(value) {
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

	setWishModalVisible(value) {
		this.setState({ wishModelOpen: value });
	}

	async createUser(dateOfBirth) {
		// Only when entered Date
		console.log("NEW USER");
		await axios.post(`http://localhost:1337/user`, {
			googleID: this.state.googleId,
			name: this.state.givenName,
			dateOfBirth,
		});

		await this.updateUserDatas();
		this.setState({ birthdayModelOpen: false });
	}

	async createGroup(group) {
		const createGroup = await axios.post(`http://localhost:1337/group/create`, {
			pseudo: group,
		});

		await axios.post(`http://localhost:1337/group/join`, {
			sharedId: createGroup.data.sharedId,
			userId: this.state.currentUser._id,
		});

		await this.updateGroupDatas();
		this.setState({ createGroupModelOpen: false });
	}

	async joinGroup(group) {
		if (this.state.groups.filter((group) => group.sharedId === group).length > 0) {
			console.log("ALREADY IN GROUP");
			return;
		}

		await axios.post(`http://localhost:1337/group/join`, {
			sharedId: group,
			userId: this.state.currentUser._id,
		});

		await this.updateGroupDatas();
		this.setState({ joinGroupModelOpen: false });
	}

	async groupExists(groupId) {
		const request = await axios.get(`http://localhost:1337/group/${groupId.replace("#", "~")}`);
		return request.data;
	}

	render() {
		const menuButton = !this.state.isLogged ? (
			<LoginButton
				onSuccess={this.handleLogin.bind(this)}
				onFailure={this.handleFailing.bind(this)}
			/>
		) : (
			<LogoutButton
				onSuccess={this.handleLogout.bind(this)}
				onFailure={this.handleFailing.bind(this)}
			/>
		);

		const body = this.state.isLogged ? (
			<Dashboard
				data={this.state}
				setDOBModalVisible={this.setDOBModalVisible.bind(this)}
				setJoinGroupModalVisible={this.setJoinGroupModalVisible.bind(this)}
				setCreateGroupModalVisible={this.setCreateGroupModalVisible.bind(this)}
				setWishModalVisible={this.setWishModalVisible.bind(this)}
				createUser={this.createUser.bind(this)}
				addItemToWishList={this.addItemToWishList.bind(this)}
				removeItemFromWishList={this.removeItemFromWishList.bind(this)}
				joinGroup={this.joinGroup.bind(this)}
				createGroup={this.createGroup.bind(this)}
				updateGroupDatas={this.updateGroupDatas.bind(this)}
			/>
		) : (
			<header className="App-header">
				<Grid inverted>
					<Grid.Row columns={"equal"}>
						<Grid.Column>
							<Header content=" LOGIN with GOOGLE to access DOST" />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</header>
		);

		return (
			<div className="App">
				<Menu inverted fixed="top" pointing>
					<Menu.Item>DOST</Menu.Item>
					<Menu.Item position="right">{menuButton}</Menu.Item>
				</Menu>
				{!this.state.isLogged && (
					<Container style={{ paddingTop: 6.5 + "em" }} textAlign="right" fluid>
						<Tween
							from={{ x: -0.5 + "em", y: 0 }}
							to={{ x: -0.5 + "em", y: -0.5 + "em" }}
							duration={1}
							repeat={-1}
							yoyo
						>
							<div>
								<Icon
									name="arrow down"
									key="arrowIcon"
									flipped="vertically"
									size="huge"
								></Icon>
							</div>
						</Tween>
					</Container>
				)}
				<Container>{body}</Container>
			</div>
		);
	}
}

export default Main;
