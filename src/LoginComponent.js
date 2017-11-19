import React from 'react';
import Config from './config';
import './LoginComponent.css';

const LoginComponent = (props) => {

  if (props.loggedIn) return null;
  return (
    <div className="container">
      <div className="login-screen">
        <h1>Simple Login.</h1>
        <p className="lead">This is a pretty simple login utilizing with OAuth2 </p>
        <a class="fb" href={Config.API_URL + "authorize/facebook"}>
          <span className="fa fa-facebook-official fa-fw"></span>
          Sign in with Facebook
        </a>
        <br />
        <a className="other" href='http://rangde.surge.sh'>Challenge I did on HackerEarth</a>
      </div>
    </div>
  );
}

export default LoginComponent;
