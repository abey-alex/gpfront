import React from 'react';
import SideBar from './SideBar';
import TableView from './TableView';
import CitySelector from './CitySelector';
import './AppView.css';

const AppView = (props) => {
  if (props.loggedIn) {
    return (
      <div className="app-container">
        <SideBar />
        <CitySelector />
        <TableView listings={props.listings}/>
      </div>
    );
  }
  return null;
}

export default AppView;
