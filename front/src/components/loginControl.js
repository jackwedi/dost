
import React from 'react';
import LogoutButton from './logout';
import LoginButton from './login';

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

    handleLogin(res) {
        this.setState({
            isLogged: true,
            ...res.profileObj
        });
    }

    handleLogout() {
        this.setState({ isLogged: false });
    }

    render() {
        let button = this.state.isLogged ? <LogoutButton onSuccess = {this.handleLogout}/> : <LoginButton onSuccess = {this.handleLogin}/>;
        return (
            <div>
                {this.state.isLogged &&
                                <img src={this.state.imageUrl} alt="icon"/>
                }
                <p>Hello {this.state.isLogged ? this.state.givenName : `please Log in`}</p>
                {button}
            </div>
        );
    }
}

export default LoginControl;