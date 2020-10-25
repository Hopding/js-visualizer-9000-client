/* @flow */
import React, { useState, useRef, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField'

import LinkIcon from '@material-ui/icons/Link';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';


const createTheme = (primary) =>createMuiTheme({
  palette: { primary },
  typography: { useNextVariants: true },
});

const pinkTheme = createTheme(pink);

const PinkButton = React.forwardRef((props, ref) => (
  <MuiThemeProvider theme={pinkTheme}>
    <Button {...props} buttonRef={ref} />
  </MuiThemeProvider>
));

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    color: 'white',
  },
  popover: {
    width: '40rem',
    zIndex: 1
  },
  popoverArrow: {
    position: 'absolute',
    height: '.75rem',
    width: '.75rem',
    top: '-0.25rem',
    left: 0,
    right: 0,
    margin: 'auto',
    '&::before': {
      content: '""',
      position: 'absolute',
      height: '.75rem',
      width: '.75rem',
      top: 0,
      left: 0,
      transform: 'translateX(0px) rotate(45deg)',
      transformOrigin: 'center center',
      backgroundColor: '#ffffff',
    },
  },
  popoverContent: {
    padding: theme.spacing.unit,
  },
  input: {
    overflow: 'hidden',
  },
});

const ShareButton = ({
  classes,
  code
}: {|
  classes: any,
  code: string
|}) => {
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const anchor = buttonRef && buttonRef.current;
  const url =  new URL(window.location.href);

  url.searchParams.set('code', btoa(code));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFocus = () => {
    inputRef.current.select();
    inputRef.current.scrollLeft = 0;
  };

  useEffect(() => {
    open && requestAnimationFrame(() => {
      inputRef.current.focus();
    });
  }, [open]);

  return (
    <div>
      <PinkButton
        color="primary"
        variant="contained"
        className={classes.button}
        ref={buttonRef}
        onClick={handleOpen}
      >
        Share
        <LinkIcon className={classes.rightIcon}>
          Run
        </LinkIcon>
      </PinkButton>
      <Popper
        open={open}
        anchorEl={anchor}
        placement="bottom"
        className={classes.popover}
      >
        <div className={classes.popoverArrow} data-popper-arrow></div>
        <Paper className={classes.popoverContent}>
          <TextField
            value={url.toString()}
            className={classes.input}
            readOnly
            fullWidth
            inputRef={inputRef}
            onBlur={handleClose}
            onFocus={handleFocus}
          />
        </Paper>
      </Popper>
    </div>
  );
}

export default withStyles(styles)(ShareButton);
