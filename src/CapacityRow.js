import React from 'react';
import './CapacityRow.css';
import Cell from './Cell.js';

function CapacityRow(props) {
  return (
    <React.Fragment>
      <div className="CapacityRow">
      {props.resource.team}, {props.resource.name} ({props.resource.skill}) :
      {props.resource.capacity.map((value, index) => {
        return <Cell key={index} data={value.availableDays} />
      })}
      </div>
    </React.Fragment>
  );
}

export default CapacityRow;
