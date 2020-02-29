import React from 'react';
import './GenericTable.css';

//TODO: is there a way to avoid global?
let uniqueValues = {}

export function GenericTable(props) {
  const row = [];

  const createRows = () => {
    //TODO: perhaps can unite if?
    props.rowHeaders
      ? props.rowHeaders.forEach((rowHeader, rowNumber) => {
          row.push(
            <tr key={rowNumber}>
              <th>{rowHeader}</th>
              {props.children[rowNumber] && Array.isArray(props.children[rowNumber])
                ? props.children[rowNumber].map((cell, columnNumber) => {
                    return (
                      <td {...getColorAttributesByContent(cell)}
                        key={columnNumber}
                        {...getEditingAttributes({
                          rowHeader,
                          columnHeader: props.columnHeaders[columnNumber]
                        })}
                      >
                        {cell}
                      </td>
                    );
                  })
                : //row is not an array, meaning it's either a single element (TODO: this case is not implemented)
                  //or an empty element (= has to put a row of '-')
                  props.columnHeaders.map((columnHeader, columnNumber) => {
                    return (
                      <td key={columnNumber} {...getEditingAttributes({ rowHeader: rowHeader, columnHeader })}>
                        -
                      </td>
                    );
                  })}
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
                      {...getEditingAttributes({
                        rowHeader: rowNumber,
                        columnHeader: props.columnHeaders[columnNumber]
                      })}
                    >
                      {cell}
                    </td>
                  );
                })
              ) : (
                <td key={rowNumber} {...getEditingAttributes({ rowHeader: rowNumber, columnHeader: 0 })}>
                  {element}
                </td>
              )}
            </tr>
          );
        });

    return row;
  };

  
  const getColorAttributesByContent = (cellValue) => {
    if (!props.ColorByValue || !cellValue) return {}
    if (!uniqueValues[props.title]) uniqueValues[props.title] = []

    let existingValue = uniqueValues[props.title].find(v=>v.value === cellValue)
    if (!existingValue) {
      const maxColorNumber = 12
      const colorId = uniqueValues[props.title].length % maxColorNumber;
      existingValue = {value:cellValue, colorId}
      uniqueValues[props.title].push(existingValue);
    }
    return {className : 'colorId'+existingValue.colorId }
  }

  const getEditingAttributes = ({ rowHeader, columnHeader }) => {
    return {
      contentEditable: props.isEditable,
      suppressContentEditableWarning: true,
      onKeyUp: e => onCellKeyUp(e, rowHeader, columnHeader),
      onKeyDown: e => onCellKeyDown(e, props.title, rowHeader, columnHeader)
    };
  };

  const cellsInitValue = { tableName: '', value: '', rowHeader: '', columnHeader: '' };
  const [cellsPreviousValue, setCellsPreviousValue] = React.useState(cellsInitValue);

  const onCellKeyDown = (e, tableName, rowHeader, columnHeader) => {
    if (
      rowHeader !== cellsPreviousValue.rowHeader ||
      columnHeader !== cellsPreviousValue.columnHeader ||
      tableName !== cellsPreviousValue.tableName
    ) {
      setCellsPreviousValue({ tableName, value: e.target.innerText, rowHeader: rowHeader, columnHeader: columnHeader });
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

  return (
    <React.Fragment>
      <h3 align="left">{props.title}</h3>
      <table>
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
