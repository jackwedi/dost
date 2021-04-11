import React from 'react';
import { GoogleLogout } from 'react-google-login';
const clientId = "612978323774-ab11267e2mg48nrmrvkhkclkavu3fdej.apps.googleusercontent.com"

function LogoutButton(props) {
    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Leave 👋"
                onLogoutSuccess={props.onSuccess}
                onFailure={(err) => props.onFailure(err)}
                theme="dark"
            />
        </div>
    );
}

export default LogoutButton;