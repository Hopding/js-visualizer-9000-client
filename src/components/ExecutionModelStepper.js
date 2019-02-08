/* @flow */
import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import CardHeaderWithAbout from './CardHeaderWithAbout';

const blueTheme = createMuiTheme({
  palette: { primary: blue },
  typography: {
    fontSize: 16,
    useNextVariants: true,
  },
});

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    flex: 1,
    maxWidth: 300,
    overflowY: 'auto',
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
  'Synchronously execute the script as though it were a function body. Run until the Call Stack is empty.',
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
  onClickAbout,
}: {|
  classes: any,
  step: 'none' | 'evaluateScript' | 'runTask' | 'runMicrotasks' | 'rerender',
  onClickAbout: void => any,
|}) => (
  <Card className={classes.card}>
    <CardContent>
      <CardHeaderWithAbout title="Event Loop" onClickAbout={onClickAbout} />
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
    </CardContent>
  </Card>
);

export default withStyles(styles)(ExecutionModelStepper);
