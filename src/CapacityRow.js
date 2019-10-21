import React from 'react';
import './CapacityRow.css';
import Cell from './Cell.js';

function CapacityRow(props) {
  return (
    <React.Fragment>
      {props.resourceName} : 

      {props.availableDaysInWeek.map((value, index) => {
        return <Cell key={index} data={value} />
      })}
      </React.Fragment>
  );
}

export default CapacityRow;
