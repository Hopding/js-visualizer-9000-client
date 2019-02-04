/* @flow */
import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const blueTheme = createMuiTheme({
  palette: { primary: blue },
  typography: {
    fontSize: 16,
  },
});

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    width: 225,
  },
  stepper: {
    backgroundColor: 'transparent',
  },
});

const stepTitles = [
  'Evaluate Script',
  'Run a Task',
  'Run all Microtasks',
  'Rerender',
];

const stepDescriptions = [
  'Synchronously execute the script as though it were a function call.',
  'Select the oldest Task from the Task Queue. Run it until the Call Stack is empty.',
  'Select the oldest Microtask from the Microtask Queue. Run it until the Call Stack is empty. Repeat until the Microtask Queue is empty.',
  'Rerender the UI. Then, return to step 2. (This step only applies to browsers, not NodeJS).',
];

const idxForStep = {
  none: -1,
  evaluateScript: 0,
  runTask: 1,
  runMicrotasks: 2,
  rerender: 3,
};

const ExecutionModelStepper = ({
  step,
  classes,
}: {|
  classes: any,
  step: 'none' | 'evaluateScript' | 'runTask' | 'runMicrotasks' | 'rerender',
|}) => (
  <Paper className={classes.root} elevation={1}>
    <MuiThemeProvider theme={blueTheme}>
      <Stepper
        activeStep={idxForStep[step]}
        orientation="vertical"
        className={classes.stepper}
      >
        {stepTitles.map((title, idx) => (
          <Step key={title} completed={idx < idxForStep[step]}>
            <StepLabel>
              <Typography
                style={{ fontWeight: idx === idxForStep[step] ? 'bold' : 'normal' }}
              >
                {title}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography>{stepDescriptions[idx]}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </MuiThemeProvider>
  </Paper>
);

export default withStyles(styles)(ExecutionModelStepper);
