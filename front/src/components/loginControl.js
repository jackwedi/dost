
import React from 'react';
import LogoutButton from './logoutButton';
import LoginButton from './loginButton';
import axios from 'axios';

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

        let user = (await axios.get(`http://localhost:1337/user/${this.state.googleId}`)).data;

        if (!user) {
            // Only when entered Date
            console.log("NEW USER");
            user = await axios.post(`http://localhost:1337/user`, { 
                googleID: this.state.googleId,
                name: this.state.givenName,
                // INPUT DATE
                dateOfBirth: Date.now(),
            }).data;
        }

        console.log(user);

        this.setState({
            wishList: user.wishList.map((item) => <li key={item} > {item}</li>),
            dateOfBirth: user.dateOfBirth,
            _id: user._id
        });

    }

    handleLogout() {
        console.log('LOGGED OUT 👋');
        this.setState({ isLogged: false });
    }

    handleFailing(log) {
        console.log(log);
    }

    render() {
        let button = this.state.isLogged ? <LogoutButton onSuccess = {this.handleLogout} onFailure = {this.handleFailing}/> : <LoginButton onSuccess = {this.handleLogin} onFailure = {this.handleFailing}/>;
        return (
            <div>
                {this.state.isLogged &&
                                <img src={this.state.imageUrl} alt="icon"/>
                }
                <p>Hello {this.state.isLogged ? this.state.givenName : `please Log in`}</p>
                {button}

                <br/>
                <br/>
                <br/>

                {this.state.isLogged &&
                                <ul>WISH LIST{this.state.wishList}</ul>
                }

            </div>
        );
    }
}

export default LoginControl;