import React, { Component } from 'react';
import LoginComponent from './LoginComponent';
import NavBar from './NavBar';
import AppView from './components/AppView'
import Config from './config'
class Container extends Component {
  state = {
    loggedIn: false,
    listings: null,
    user: null
  }

  componentWillMount() {
    const self = this;
    fetch(Config.API_URL + 'me', {
      method: 'GET',
      credentials: 'include'
    }).then(function(response) {
      const contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
    }).then(function(json) {
        if (json && 'user' in json) self.setState({ loggedIn: true, listings: json.listings, user:json.user });
    }).catch(function(error) { console.log(error); });
  }

  render() {
    return (
      <div>
        <NavBar
          loggedIn={this.state.loggedIn}
          user={this.state.user}
        />
        <LoginComponent loggedIn={this.state.loggedIn} />
        <AppView
          loggedIn={this.state.loggedIn}
          listings={this.state.listings}
        />
      </div>
    );
  }
}

export default Container;
