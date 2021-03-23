import React from 'react';
import { GoogleLogin } from 'react-google-login';
const clientId = "612978323774-ab11267e2mg48nrmrvkhkclkavu3fdej.apps.googleusercontent.com"

function LoginButton(props) {
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in 🖐"
                onSuccess={(res) => props.onSuccess(res)}
                onFailure={(err) => props.onFailure(err)}
                cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
            />
        </div>
    );
}

export default LoginButton;