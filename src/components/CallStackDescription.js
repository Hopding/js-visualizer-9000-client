/* @flow */
import React from 'react';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CallStackDescription = ({
  open,
  onClose,
}: {|
  open: boolean,
  onClose: void => any,
|}) => (
  <Dialog
    open={open}
    onClose={onClose}
    scroll="paper"
    aria-labelledby="scroll-dialog-title"
  >
    <DialogTitle id="scroll-dialog-title">About the Call Stack</DialogTitle>
    <DialogContent>
      <DialogContentText>
        The <b>Call Stack</b> is a fundamental part of the JavaScript language. It is a record-keeping structure that allows us to perform function calls. Each function call is represented as a frame on the <b>Call Stack</b>. This is how the JavaScript engine keeps track of which functions have been called and in what order. The JS engine uses this information to ensure execution picks back up in the right spot after a function returns.
      </DialogContentText>
      <br />
      <DialogContentText>
        When a JavaScript program first starts executing, the <b>Call Stack</b> is empty. When the first function call is made, a new frame is pushed onto the top of the <b>Call Stack</b>. When that function returns, its frame is popped off of the <b>Call Stack</b>.
      </DialogContentText>
      <br />
      <DialogContentText>
        <Link
          variant="body1"
          color="secondary"
          href="https://www.ecma-international.org/ecma-262/9.0/index.html#sec-execution-contexts"
          target="_blank"
          rel="noreferrer"
         >
          Learn more from the JavaScript Spec
         </Link>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default CallStackDescription;
