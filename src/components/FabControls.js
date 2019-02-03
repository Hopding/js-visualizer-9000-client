/* @flow */
import React from 'react';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';
import FastForwardIcon from '@material-ui/icons/FastForward';

import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
    overflow: 'hidden',
  },
}

const themedStyles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const FabControls = ({
  classes,
  visible,
  onClickStep,
  onClickStepBack,
  onClickAutoStep,
}: {|
  classes: any,
  visible: boolean,
  onClickStep: void => any,
  onClickStepBack: void => any,
  onClickAutoStep: void => any,
|}) => (
  <div style={styles.container}>
    <Tooltip
      style={{ transitionDelay: '100ms' }}
      title="Auto Step"
      aria-label="Auto Step"
      placement="left"
    >
      <Zoom in={visible} className={classes.fab}>
        <Fab
          style={{ backgroundColor: blue['500'], color: '#ffffff' }}
          color="primary"
          size="medium"
          aria-label="Add"
          onClick={onClickAutoStep}
        >
          <FastForwardIcon />
        </Fab>
      </Zoom>
    </Tooltip>
    <Tooltip
      style={{ transitionDelay: '50ms' }}
      title="Step Back"
      aria-label="Step Back"
      placement="left"
    >
      <Zoom in={visible} className={classes.fab}>
        <Fab
          style={{ backgroundColor: pink['500'], color: '#ffffff' }}
          color="secondary"
          size="medium"
          aria-label="Edit"
          onClick={onClickStepBack}
        >
          <ReplayIcon />
        </Fab>
      </Zoom>
    </Tooltip>
    <Zoom style={{ transitionDelay: '0ms' }} in={visible}>
      <Fab
        style={{ backgroundColor: green['500'], color: '#ffffff' }}
        variant="extended"
        size="large"
        aria-label="Delete"
        className={classes.fab}
        onClick={onClickStep}
      >
        <PlayArrowIcon className={classes.extendedIcon} />
        Step
      </Fab>
    </Zoom>
  </div>
);

export default withStyles(themedStyles)(FabControls);
