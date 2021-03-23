
import React from 'react';
import LogoutButton from './logoutButton';
import LoginButton from './loginButton';

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
        console.log(`LOGGED IN 👌`, res.profileObj);

        this.setState({
            isLogged: true,
            ...res.profileObj
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
            </div>
        );
    }
}

export default LoginControl;