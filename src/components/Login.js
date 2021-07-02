import React, { useEffect } from 'react'
import { GoogleOutlined, FacebookOutlined} from '@ant-design/icons';
import firebase from "firebase/app"

import { auth } from "../firebase"

const Login = () => {

    useEffect(() => {
        document.title = "Login | Chat App";
    }, []);
    
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Unichat!</h2>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Sign in with Google
                </div>
                <br /> <br />

                <div
                    className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookProvider())}
                >
                    <FacebookOutlined /> Sign in with Facebook
                </div>
            </div>
        </div>
    )
};

export default Login;
