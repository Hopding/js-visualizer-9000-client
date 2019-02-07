/* @flow */
import React from 'react';

import Button from '@material-ui/core/Button';
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
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
        facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
        at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
        sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
        nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur
        et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
        lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
        sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
        consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
        lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
        sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
        consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
        lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
        sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
        consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
        lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
        sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
        consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
        lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
        sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
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
