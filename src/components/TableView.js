import React from 'react';
import Row from './Row';
import './TableView.css';

const TableView = (props) => {

  const listings = props.listings;
  const rows = listings.map((row, i) => {
    return <Row key={i} row={row} />
  });

  return (
      <table className="board">
        <caption className="title">Listings</caption>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Source</th>
            <th scope="col">Name</th>
            <th className="test" scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Rating</th>
            <th scope="col">Listed</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
  );
}

export default TableView;
