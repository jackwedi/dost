import React from 'react';
import { GoogleLogout } from 'react-google-login';
const clientId = "612978323774-ab11267e2mg48nrmrvkhkclkavu3fdej.apps.googleusercontent.com"

function LogoutButton(props) {
    const onSuccess = () => {
        props.onSuccess();
        console.log('LOGGED OUT 👋');
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Bye 👋"
                onLogoutSuccess={onSuccess}
                theme="dark"
            />
        </div>
    );
}

export default LogoutButton;