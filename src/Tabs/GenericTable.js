import React from 'react';

export function GenericTable(props) {
  const row = [];
  const createRows = () => {
    //TODO: perhaps can unite if?
    props.rowHeaders
      ? props.rowHeaders.forEach((element, rowNumber) => {
          row.push(
            <tr key={rowNumber}>
              <th>{element}</th>
              {props.children[rowNumber] && Array.isArray(props.children[rowNumber]) ? (
                props.children[rowNumber].map((cell, columnNumber) => {
                  return (
                    <td
                      key={columnNumber}
                      contentEditable={props.isEditable}
                      suppressContentEditableWarning={true}
                      onKeyUp={e => onCellKeyUp(e, element, props.columnHeaders[columnNumber])}
                      onKeyDown={e => onCellKeyDown(e, props.title, rowNumber, columnNumber)}
                    >
                      {cell}
                    </td>
                  );
                })
              ) : (
                <td
                  key={rowNumber}
                  contentEditable={props.isEditable}
                  suppressContentEditableWarning={true}
                  onKeyUp={e => onCellKeyUp(e, element, 0)}
                  onKeyDown={e => onCellKeyDown(e, props.title, rowNumber, 0)}
                >
                  {element}>{props.children[rowNumber]}
                </td>
              )}
            </tr>
          );
        })
      : props.children.forEach((element, rowNumber) => {
          row.push(
            <tr key={rowNumber}>
              {element && Array.isArray(element) ? (
                element.map((cell, columnNumber) => {
                  return (
                    <td
                      key={columnNumber}
                      contentEditable={props.isEditable}
                      onKeyUp={e => onCellKeyUp(e, rowNumber, props.columnHeaders[columnNumber])}
                      onKeyDown={e => onCellKeyDown(e, props.title, rowNumber, columnNumber)}
                    >
                      {cell}
                    </td>
                  );
                })
              ) : (
                <td
                  key={rowNumber}
                  contentEditable={props.isEditable}
                  onKeyUp={e => onCellKeyUp(e, rowNumber, 0)}
                  onKeyDown={e => onCellKeyDown(e, props.title, rowNumber, 0)}
                >
                  {element}
                </td>
              )}
            </tr>
          );
        });

    return row;
  };

  const cellsInitValue = { tableName: '', value: '', x: -1, y: -1 };
  const [cellsPreviousValue, setCellsPreviousValue] = React.useState(cellsInitValue);

  const onCellKeyDown = (e, tableName, x, y) => {
    if (x !== cellsPreviousValue.x || y !== cellsPreviousValue.y || tableName !== cellsPreviousValue.tableName) {
      setCellsPreviousValue({ tableName, value: e.target.innerText, x, y });
    }
  };

  const onCellKeyUp = (e, x, y) => {
    if (e.key === 'Enter') {
      eraseEnterFromCell(e);

      props.onCellChanged(e.target.innerText, x, y);
      e.target.blur();
    }
    if (e.key === 'Escape') {
      e.target.innerText = cellsPreviousValue.value;
      setCellsPreviousValue(cellsInitValue);
      e.target.blur();
    }
  };

  const eraseEnterFromCell = e => {
    e.target.innerText = e.target.innerText.replace('\n', '');
  };

  //TODO replace <u> with css style
  return (
    <React.Fragment>
      <h3 align="left">
        <u>{props.title}</u>
      </h3>
      <table style={{ border: '1px solid red' }}>
        <thead>
          <tr>
            {props.rowHeaders && <th />}
            {props.columnHeaders &&
              props.columnHeaders.map((h, i) => {
                return <th key={i}>{h}</th>;
              })}
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </React.Fragment>
  );
}
