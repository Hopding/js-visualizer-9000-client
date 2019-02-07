/* @flow */
import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';

import EXAMPLES1 from '../assets/examples1';
import EXAMPLES2 from '../assets/examples2';
import EXAMPLES3 from '../assets/examples3';

const styles = theme => ({
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
  example,
  locked,
  onChangeExample,
}: {|
  classes: any,
  example: string,
  locked: boolean,
  onChangeExample: ({ target: { value: string } }) => any,
|}) => (
  <form className={classes.form} autoComplete="off">
    <FormControl className={classes.formControl}>
      <Select
        value={example}
        onChange={onChangeExample}
        disabled={locked}
      >
        <MenuItem value="none">
          <em>Choose an Example</em>
        </MenuItem>
        <Divider />
        {EXAMPLES1.map(({ name, value }) => (
          <MenuItem key={name} value={value}>{name}</MenuItem>
        ))}
        <Divider />
        {EXAMPLES2.map(({ name, value }) => (
          <MenuItem key={name} value={value}>{name}</MenuItem>
        ))}
        <Divider />
        {EXAMPLES3.map(({ name, value }) => (
          <MenuItem key={name} value={value}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </form>
);

export default withStyles(styles)(ExampleSelector);
