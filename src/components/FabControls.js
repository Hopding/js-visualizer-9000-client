/* @flow */
import React from 'react';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';
import PauseIcon from '@material-ui/icons/Pause';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';

const createTheme = primary =>
  createMuiTheme({
    palette: { primary },
    typography: { useNextVariants: true },
  });

const greenTheme = createTheme(green);

const GreenFab = props => (
  <MuiThemeProvider theme={greenTheme}>
    <Fab {...props} />
  </MuiThemeProvider>
);

const blueTheme = createTheme(blue);

const BlueFab = props => (
  <MuiThemeProvider theme={blueTheme}>
    <Fab {...props} />
  </MuiThemeProvider>
);

const yellowTheme = createTheme(yellow);

const YellowFab = props => (
  <MuiThemeProvider theme={yellowTheme}>
    <Fab {...props} />
  </MuiThemeProvider>
);

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
};

const themedStyles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  yellowFab: {
    margin: theme.spacing.unit,
    color: 'black',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const FabControls = ({
  classes,
  visible,
  isAutoPlaying,
  hasReachedEnd,
  onClickStep,
  onClickStepBack,
  onClickAutoStep,
  onClickPauseAutoStep,
}: {|
  classes: any,
  visible: boolean,
  isAutoPlaying: boolean,
  hasReachedEnd: boolean,
  onClickStep: void => any,
  onClickStepBack: void => any,
  onClickAutoStep: void => any,
  onClickPauseAutoStep: void => any,
|}) => (
  <div style={styles.container}>
    {!isAutoPlaying && (
      <Tooltip
        style={{ transitionDelay: '50ms' }}
        title="Auto Step"
        aria-label="Auto Step"
        placement="left"
      >
        <div>
          <Zoom in={visible && !isAutoPlaying} className={classes.fab}>
            <BlueFab
              color="primary"
              size="medium"
              aria-label="auto-play"
              disabled={hasReachedEnd}
              onClick={onClickAutoStep}
            >
              <FastForwardIcon />
            </BlueFab>
          </Zoom>
        </div>
      </Tooltip>
    )}
    {isAutoPlaying && (
      <Tooltip
        style={{ transitionDelay: '50ms' }}
        title="Pause Auto Step"
        aria-label="Pause Auto Step"
        placement="left"
      >
        <div>
          <Zoom in={visible && isAutoPlaying} className={classes.yellowFab}>
            <YellowFab
              color="primary"
              size="medium"
              aria-label="pause"
              disabled={hasReachedEnd}
              onClick={onClickPauseAutoStep}
            >
              <PauseIcon />
            </YellowFab>
          </Zoom>
        </div>
      </Tooltip>
    )}
    {/* Commenting this out until the actually backstep logic is finished */}
    {/* <Tooltip
      style={{ transitionDelay: '50ms' }}
      title="Step Back"
      aria-label="Step Back"
      placement="left"
    >
      <div>
        <Zoom in={visible} className={classes.fab}>
          <PinkFab
            color="primary"
            size="medium"
            aria-label="step-back"
            disabled={isAutoPlaying}
            onClick={onClickStepBack}
          >
            <ReplayIcon />
          </PinkFab>
        </Zoom>
      </div>
    </Tooltip> */}
    <Zoom style={{ transitionDelay: '0ms' }} in={visible}>
      <GreenFab
        color="primary"
        variant="extended"
        size="large"
        aria-label="Delete"
        className={classes.fab}
        disabled={isAutoPlaying || hasReachedEnd}
        onClick={onClickStep}
      >
        <PlayArrowIcon className={classes.extendedIcon} />
        Step
      </GreenFab>
    </Zoom>
  </div>
);

export default withStyles(themedStyles)(FabControls);
