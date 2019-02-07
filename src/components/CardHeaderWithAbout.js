/* @flow */
import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';

const createTheme = (primary) => createMuiTheme({
  palette: { primary },
  typography: { useNextVariants: true },
});

const blueTheme = createTheme(blue);

const BlueButton = (props) => (
  <MuiThemeProvider theme={blueTheme}>
    <Button {...props} />
  </MuiThemeProvider>
);

const themedStyles = theme => ({
  header: {
    padding: 0,
  },
  margin1: {
  },
  margin2: {
    marginRight: 25,
  }
})

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

const CardHeaderWithAbout = ({
  classes,
  slideButtonLeft = false,
  title,
  onClickAbout,
}: {|
  classes: any,
  slideButtonLeft?: boolean,
  title: string,
  onClickAbout: void => any,
|}) => (
  <div style={styles.container}>
    <CardHeader title={title} className={classes.header} />
    <BlueButton
      color="primary"
      size="small"
      className={slideButtonLeft ? classes.margin2 : classes.margin1}
      onClick={onClickAbout}
    >
      About
    </BlueButton>
  </div>
);

export default withStyles(themedStyles)(CardHeaderWithAbout);
