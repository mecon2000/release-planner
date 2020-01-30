import React from "react";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export function GenericTable(props) {

  const row = [];
  const createRows = () => {
    //TODO perhaps can unite if?
    props.rowHeaders
      ? props.rowHeaders.forEach((element, rowNumber) => {
          row.push(
            <Tr>
              <Th width="10%">{element}</Th>
              {props.children[rowNumber] && Array.isArray(props.children[rowNumber]) ? (
                props.children[rowNumber].map((cell,columnNumber) => {
                  return <Td width="10%" contentEditable={props.isEditable} 
                  onKeyUp={e => onCellKeyUp(e,rowNumber,columnNumber)}>{cell}</Td>;
                })
              ) : (
                <Td width="10%" contentEditable={props.isEditable} onKeyUp={e => onCellKeyUp(e,rowNumber,0)}>{props.children[rowNumber]}</Td>
              )}
            </Tr>
          );
        })
      : props.children.forEach((element, rowNumber) => {
          row.push(
            <Tr>
              {element && Array.isArray(element) ? (
                element.map((cell,columnNumber) => {
                  return <Td width="10%" contentEditable={props.isEditable} onKeyUp={e => onCellKeyUp(e,rowNumber,columnNumber)}>{cell}</Td>;
                })
              ) : (
                <Td width="10%" contentEditable={props.isEditable} onKeyUp={e => onCellKeyUp(e,rowNumber,0)}>{element}</Td>
              )}
            </Tr>
          );
        });

    return row;
  };

  //TODO - save originalCellValue when starting to edit a cell.
  let originalCellValue = null

  //TODO perhaps replace x,y with rowHeader, columnHeader
  const onCellKeyUp = (e,x,y) => {
    if (e.key === "Enter") {
      eraseEnterFromCell(e);
      
      props.onCellChanged(e.target.innerText,x,y); 
      e.target.blur();
    }
    if (e.key === "Escape") {
      e.target.innerText = originalCellValue;
      originalCellValue = null;
      e.target.blur();
    }
  };
  
  function eraseEnterFromCell(e) {
    e.target.innerText = e.target.innerText.replace("\n","");
  }

  //TODO replace <u> with css style
  //TODO width should be in a param that all adress it.
  return (
    <React.Fragment>
      <div className="responsiveTable"></div>
      <h1 align="left">
        <u>{props.title}</u>
      </h1>
      <Table>
        <Thead>
          <Tr>
            {props.rowHeaders && <Th width="10%" />}
            {props.columnHeaders.map(h => {
              return <Th width="10%">{h}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {createRows()}
        </Tbody>
      </Table>
    </React.Fragment>
  );

}
