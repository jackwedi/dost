import LoginButton from "./loginButton";

function Login(props) {
    console.log(props);
    return (
        <div>
            <p>Hello {`please log`}</p>
            <LoginButton
                onSuccess={props.onSuccess}
                onFailure={props.onFailure}
            />
        </div>
    );
}

export default Login;