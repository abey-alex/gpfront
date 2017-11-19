import React from 'react';
import './SideBar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <header className="company">GROWTH PLUG</header>
      <nav>
        <ul>
          <li><a><i className="material-icons">home</i>Dashboard</a></li>
          <li><a><i className="material-icons">web</i>Website</a></li>
          <li><a><i className="material-icons">mouse</i>Visitors</a></li>
          <li><a><i className="material-icons">star</i>Reviews</a></li>
          <li data-ui='selected'><a><i className="material-icons">toc</i>Listings</a></li>
          <li><a href=""><i className="material-icons">date_range</i>Appointments</a></li>
          <li><a><i className="material-icons">settings</i>Settings</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
