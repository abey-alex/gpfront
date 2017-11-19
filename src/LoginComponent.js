import React from 'react';
import Config from './config';
import './LoginComponent.css';

const LoginComponent = (props) => {

  if (props.loggedIn) return null;
  return (
    <div className="container">
      <div className="login-screen">
        <h1>Sweet login, brah.</h1>
        <p className="lead">This is a pretty simple login utilizing </p>
        <a href={Config.API_URL + "authorize/facebook"}>
          <span className="fa fa-facebook-official fa-fw"></span>
          Sign in with Facebook
        </a>
      </div>
    </div>
  );
}

export default LoginComponent;
