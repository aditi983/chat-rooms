import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css';
import logo from './wechat-black.svg';
import { auth, provider } from './firebase';
import {actionTypes} from './reducer';
import {useStateValue} from './StateProvider';

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error)=>alert(error.message));
    };
    return (
        <div className='login'>
            <div className='login_container'></div>
                <div className='login_form'>
                    <img src={logo} alt=''/>
                    <div className='login_text'>
                        <h1>Welcome to Chat Rooms</h1>
                    </div>
                    <Button onClick={signIn}>
                        Sign In with Google
                    </Button>
                </div>
        </div>
    )
}

export default Login
