/* @flow */
import React from 'react';

import Button from '@material-ui/core/Button';

import SendIcon from '@material-ui/icons/Send';
import CodeIcon from '@material-ui/icons/Code';

import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

const styles = {
  runButton: {
    backgroundColor: green['500'],
    color: '#ffffff',
  },
  editButton: {
    backgroundColor: blue['300'],
    color: '#ffffff',
  },
}

const themedStyles = theme => ({
  runButton: {
    margin: theme.spacing.unit,
  },
  editButton: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const RunOrEditButton = ({
  classes,
  mode,
  onClickRun,
  onClickEdit,
}: {|
  classes: any,
  mode: 'editing' | 'visualizing',
  onClickRun: void => any,
  onClickEdit: void => any,
|}) => (
  <div>
    {
      mode === 'editing' ? (
        <Button
          style={styles.runButton}
          variant="contained"
          className={classes.runButton}
          onClick={onClickRun}
        >
          Run
          <SendIcon className={classes.rightIcon}>Run</SendIcon>
        </Button>
      ) : mode === 'visualizing' ? (
        <Button
          style={styles.editButton}
          variant="contained"
          className={classes.editButton}
          onClick={onClickEdit}
        >
          Edit
          <CodeIcon className={classes.rightIcon}>Edit</CodeIcon>
        </Button>
      ) : new Error(`Invalid mode: ${mode}`)
    }
  </div>
);

export default withStyles(themedStyles)(RunOrEditButton);
