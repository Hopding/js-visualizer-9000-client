/* @flow */
import React from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import { withStyles } from '@material-ui/core/styles';

const themedStyles = theme => ({

})

const ExecutionModelStepper = ({
  classes,
}: {|
  classes: any
|}) => (
  <div>
    {/*<Stepper style={{ backgroundColor: 'transparent' }} activeStep={0} orientation="vertical">*/}
    <Stepper style={{ backgroundColor: 'transparent' }} activeStep={0} alternativeLabel>
      {['Task Step', 'Microtask Step', 'Rerender Step'].map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          {/*<StepContent>
            <Typography>Stuff and things!</Typography>
          </StepContent>*/}
        </Step>
      ))}
    </Stepper>
  </div>
);

export default withStyles(themedStyles)(ExecutionModelStepper);
