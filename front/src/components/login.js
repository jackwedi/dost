import React from 'react';
import { GoogleLogin } from 'react-google-login';
const clientId = "612978323774-ab11267e2mg48nrmrvkhkclkavu3fdej.apps.googleusercontent.com"

function LoginButton(props) {
    const onSuccess = (res) => {
        props.onSuccess(res);
        console.log(`Login SUCESS`, res.profileObj);
    }

    const onFailure = (res) => {
        console.log(`Login FAILED ${res}`);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in 🖐"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
            />
        </div>
    );
}

export default LoginButton;