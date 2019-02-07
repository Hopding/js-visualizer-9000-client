/* @flow */
import React from 'react';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const TaskQueueDescription = ({
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
    <DialogTitle id="scroll-dialog-title">About the Task Queue</DialogTitle>
    <DialogContent>
      <DialogContentText>
        If the Call Stack keeps track of the functions that are executing right now, then the <b>Task Queue</b> keeps track of functions that are going to be executed in the future.
      </DialogContentText>
      <br />
      <DialogContentText>
        The <b>Task Queue</b> is a FIFO queue of tasks that are processed by the Event Loop. Tasks are synchronous blocks of code. You can think of them as Function objects.
      </DialogContentText>
      <br />
      <DialogContentText>
        The Event Loop works by continuously looping through the <b>Task Queue</b> and processing the tasks it contains one by one. A single iteration of the Event Loop is called a tick.
      </DialogContentText>
      <br />
      <DialogContentText>
        To process a task, the Event Loop invokes the Function associated with it. While a task is running, it has exclusive access to the Call Stack. The Event Loop waits to process the next task until the current task is finished, and the Call Stack is empty.
      </DialogContentText>
      <br />
      <DialogContentText>
        While a task is running, it can enqueue other tasks to be processed in subsequent ticks of the Event Loop. There are several ways to do this, the simplest of which is <code>setTimeout(taskFn, 0)</code>. Tasks can also come from external sources such as DOM and network events.
      </DialogContentText>
      <br />
      <DialogContentText>
        <Link
          variant="body2"
          color="secondary"
          href="https://www.w3.org/TR/html52/webappapis.html#task-queues"
          target="_blank"
          rel="noreferrer"
         >
          Learn more from the HTML Scripting Spec
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

export default TaskQueueDescription;
