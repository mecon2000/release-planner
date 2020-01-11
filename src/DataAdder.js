import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './App.css';

//TODO this is a copy from apps. unify!!
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'gray',
    },
  }));

export function DataAdder(props) {
  const classes = useStyles();
  const [inputData, setinputData] = React.useState({});
  
   const handleInputChanged = (e) => {
    inputData[e.target.name] = e.target.value;
    setinputData(inputData);
  };

  const fieldElements = [];
  props.fields.forEach((field,index) => { fieldElements.push(
  <Input 
    name={"field"+index}
    onChange={handleInputChanged}
    placeholder={field}
    className={classes.input}
    color="primary"
    variant="outlined"
    required={true}
    inputProps={{'aria-label': 'description'}}
  />)
  });

  return (
        <React.Fragment>
            {fieldElements}
            <Button onClick={e=>props.onAddClicked(e,inputData)} variant="contained" color="primary">
              Add
            </Button>
          </React.Fragment>
  );
}