import React from 'react';
import Config from './config';
import './NavBar.css';

const NavBar = (props) => {
  const renderLogger = () => {
    if(props.loggedIn) {
      return (
        <a className="login-head" href={Config.API_URL + "logout"}>
          <span className="fa-pad fa fa-sign-out"></span>
          Logout
        </a>
      );
    }
    return (
      <a className="login-head" href={Config.API_URL + "authorize/facebook"}>
        <span className="fa-pad fa fa-facebook-official"></span>
        Sign In with Facebook
      </a>
    );
  }

  const logo = '//console.growthplug.com/static/myproject/img/growthplug-logo.png'

  return (
    <nav className="topnav">
      <div className="container">
        <div className="nav-header">
          <a className="nav-brand"><img src={logo} alt="logo" /></a>
        </div>
        <div className="social">
          {renderLogger()}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
