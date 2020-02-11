import React from 'react';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

export function GenericTable(props) {
  const row = [];
  const createRows = () => {
    //TODO perhaps can unite if?
    props.rowHeaders
      ? props.rowHeaders.forEach((element, rowNumber) => {
          row.push(
            <Tr key={rowNumber}>
              <Th width="10%">{element}</Th>
              {props.children[rowNumber] && Array.isArray(props.children[rowNumber]) ? (
                props.children[rowNumber].map((cell, columnNumber) => {
                  return (
                    <Td
                      width="10%"
                      key={columnNumber}
                      contentEditable={props.isEditable}
                      suppressContentEditableWarning={true}
                      onKeyUp={e => onCellKeyUp(e, element, props.columnHeaders[columnNumber])}
                      onKeyDown={e => onCellKeyDown(e, props.title, rowNumber, columnNumber)}
                    >
                      {cell}
                    </Td>
                  );
                })
              ) : (
                <Td
                  width="10%"
                  key={rowNumber}
                  contentEditable={props.isEditable}
                  onKeyUp={e => onCellKeyUp(e, element, 0)}
                  onKeyDown={e => onCellKeyDown(e, props.title, rowNumber, 0)}
                >
                  {element}>{props.children[rowNumber]}
                </Td>
              )}
            </Tr>
          );
        })
      : props.children.forEach((element, rowNumber) => {
          row.push(
            <Tr key={rowNumber}>
              {element && Array.isArray(element) ? (
                element.map((cell, columnNumber) => {
                  return (
                    <Td
                      width="10%"
                      key={columnNumber}
                      contentEditable={props.isEditable}
                      onKeyUp={e => onCellKeyUp(e, rowNumber, props.columnHeaders[columnNumber])}
                      onKeyDown={e => onCellKeyDown(e, props.title, rowNumber, columnNumber)}
                    >
                      {cell}
                    </Td>
                  );
                })
              ) : (
                <Td
                  width="10%"
                  key={rowNumber}
                  contentEditable={props.isEditable}
                  onKeyUp={e => onCellKeyUp(e, rowNumber, 0)}
                  onKeyDown={e => onCellKeyDown(e, props.title, rowNumber, 0)}
                >
                  {element}
                </Td>
              )}
            </Tr>
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
  //TODO width should be in a param that all adress it.
  return (
    <React.Fragment>
      <div className="responsiveTable"></div>
      <h1 align="left">
        <u>{props.title}</u>
      </h1>
      <Table style={{ border: '1px solid red', width: 'initial' }}>
        <Thead>
          <Tr>
            {props.rowHeaders && <Th width="10%" />}
            {props.columnHeaders && props.columnHeaders.map((h, i) => {
              return (
                <Th width="10%" key={i}>
                  {h}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>{createRows()}</Tbody>
      </Table>
    </React.Fragment>
  );
}
