/* @flow */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
});

const Attribution = ({ classes }: {| classes: any |}) => (
  <Typography
    variant="body1"
    color="inherit"
    className={classes.root}
    align="center"
  >
    Built by{' '}
    <Link
      variant="body1"
      color="secondary"
      href="https://github.com/Hopding/"
      target="_blank"
      rel="noreferrer"
    >
      Andrew Dillon
    </Link>
    . Inspired by{' '}
    <Link
      variant="body1"
      color="secondary"
      href="http://latentflip.com/loupe/"
      target="_blank"
      rel="noreferrer"
    >
      Loupe
    </Link>
    .
  </Typography>
);

export default withStyles(styles)(Attribution);
