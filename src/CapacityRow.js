import React from 'react';
import './CapacityRow.css';
import Cell from './Cell.js';

function CapacityRow(props) {
  return (
    <div className="CapacityRow">
      <div className="Header"> {props.resource.team}, {props.resource.name} ({props.resource.skill}) </div>
      {props.resource.capacity.map((value, index) => {
        return <Cell key={index} data={value.availableDays} />
      })}
    </div>
  );
}

export default CapacityRow;
