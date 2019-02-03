/* @flow */
import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';

const themedStyles = theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit,
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const ExampleSelector = ({
  classes,
}: {|
  classes: any,
|}) => (
  <form className={classes.form} autoComplete="off">
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="example">Example</InputLabel>
      <Select
        value="example"
        onChange={() => {}}
        inputProps={{
          name: 'example-name',
          id: 'example-id',
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="exampleOne">Example One</MenuItem>
        <MenuItem value="exampleTwo">Example Two</MenuItem>
        <MenuItem value="exampleThree">Example Three</MenuItem>
      </Select>
    </FormControl>
  </form>
);

export default withStyles(themedStyles)(ExampleSelector);
