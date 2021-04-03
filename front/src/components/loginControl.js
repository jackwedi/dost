
import React from 'react';
import LogoutButton from './logoutButton';
import LoginButton from './loginButton';
import axios from 'axios';
import WishList from './wishlist';
import Groups from './groups';
import { Grid } from 'semantic-ui-react'

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        // email
        // familyName
        // givenName
        // googleId
        // imageUrl
        // name
        this.state = { isLogged: false }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogin(res) {
        console.log(`LOGGED IN 👌`, res.profileObj);

        this.setState({
            isLogged: true,
            ...res.profileObj
        });

        await this.loadDatas();
    }

    async loadDatas() {
        let user = (await axios.get(`http://localhost:1337/user/${this.state.googleId}`)).data;

        if (!user) {
            // Only when entered Date
            console.log("NEW USER");
            const createUserResponse = await axios.post(`http://localhost:1337/user`, { 
                googleID: this.state.googleId,
                name: this.state.givenName,
                // INPUT DATE
                dateOfBirth: Date.now(),
            });

            user = createUserResponse.data;
        }

        let groups =  (await axios.get(`http://localhost:1337/group/${user._id}`)).data;

        this.setState({
            wishList: user.wishList,
            dateOfBirth: user.dateOfBirth,
            _id: user._id,
            groups
        });
        console.log(user.wishList)
    }

    async addItemToWishList(value) {
        let request = (await axios.post(`http://localhost:1337/user/addwish/${this.state.googleId}/${value}`)).data;
        this.setState({wishList: request.wishList });
    }

    async removeItemToWishList(value) {
        let request = (await axios.post(`http://localhost:1337/user/removewish/${this.state.googleId}/${value}`)).data;
        this.setState({wishList: request.wishList });
    }

    handleLogout() {
        console.log('LOGGED OUT 👋');
        this.setState({ isLogged: false });
    }

    handleFailing(log) {
        console.log(log);
    }

    loggedUI() {
        return (<div>
            <img src={this.state.imageUrl} alt="icon"/>
            <p>Hello {this.state.givenName }</p>
            <Grid>

                <WishList 
                    list = {this.state.wishList}
                    addItem = {this.addItemToWishList.bind(this)}
                    removeItem = {this.removeItemToWishList.bind(this)}
                />
                <Groups list = {this.state.groups}></Groups>

            </Grid>
            <br/>
            <br/>
            <br/>
            <LogoutButton onSuccess = {this.handleLogout} onFailure = {this.handleFailing}/>
        </div>)
    }

    notLoggedUI() {
    return (<div>
            <p>Hello {`please log`}</p>
            <LoginButton onSuccess = {this.handleLogin} onFailure = {this.handleFailing}/>
        </div>)
    }

    render() {
        return this.state.isLogged ? this.loggedUI() : this.notLoggedUI();
    }
}

export default LoginControl;