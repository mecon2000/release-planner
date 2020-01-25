import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

import { useStyles } from "./GeneralStyles.js";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./App.css";

export function DataAdder(props) {
  const classes = useStyles();
  const [inputData, setinputData] = React.useState({});

  const handleInputChanged = e => {
    inputData[e.target.name] = e.target.value;
    setinputData(inputData);
  };

  const fieldElements = [];
  props.fields.forEach((placeholderText, index) => {
    fieldElements.push(
      <Input
        key={"key" + index}
        name={"field" + index}
        onChange={handleInputChanged}
        placeholder={placeholderText}
        className={classes.input}
        color="primary"
        variant="outlined"
        required={true}
        inputProps={{ "aria-label": "description" }}
      />
    );
  });

  return (
    <React.Fragment>
      {fieldElements}
      <Button
        onClick={e => props.onAddClicked(e, inputData)}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </React.Fragment>
  );
}
