import React from 'react';
import './Cell.css';

function Cell(props) {
  return (
    <div className="Cell">
      {props.data}
    </div>
  );
}

export default Cell;
