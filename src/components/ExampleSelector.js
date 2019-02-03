/* @flow */
import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';

import EXAMPLES from '../assets/examples';

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
        {EXAMPLES.map(({ name, value }) => (
          <MenuItem value={value}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </form>
);

export default withStyles(styles)(ExampleSelector);
