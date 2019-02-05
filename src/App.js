import React, { Component } from 'react';
import uuid from 'uuid/v4';

// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

// NOTE: We're using a copied version of `notistack` for now, since the version
//       that is currently published to NPM doesn't provide the `closeSnackbar`
//       prop (which we need).
import { SnackbarProvider, withSnackbar } from './notistack';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import AppRoot from './AppRoot';
import { fetchEventsForCode } from './utils/events';

const pause = (millis) => new Promise(resolve => setTimeout(resolve, millis));

const isPlayableEvent = ({ type }) => [
  'EnterFunction',
  'ExitFunction',
  'EnqueueMicrotask',
  'DequeueMicrotask',
  'InitTimeout',
  'BeforeTimeout',
  'Rerender',
  'ConsoleLog',
  'ConsoleWarn',
  'ConsoleError',
  'ErrorFunction',
].includes(type);

const PRETTY_MUCH_INFINITY = 9999999999;

class App extends Component {
  state = {
    // tasks: _.range(10).map(id => ({ id, name: 'setTimeout' })),
    // microtasks: _.range(10).map(id => ({ id, name: 'resolve' })),
    // frames: _.range(20).map(id => ({ id, name: 'foo()' })),
    tasks: [],
    microtasks: [],
    frames: [],
    markers: [],
    mode: 'editing', // 'editing' | 'running' | 'visualizing'
    code: '',
    isAutoPlaying: false,
    currentStep: 'none', // 'none' | 'runTask' | 'runMicrotasks' | 'rerender',
    example: 'none',
    // stats: {
    //   promisesCreated: 0,
    //   promisesResolved: 0,
    //   functionCalls: 0,
    //   tasksCreated: 0,
    //   microtasksCreated: 0,
    // }
  };

  currEventIdx: number = 0;
  events: { type: string, payload: any }[] = [];
  snackbarIds: string[] = [];

  componentDidMount() {
    const code = localStorage.getItem('code') || '';
    this.setState({ code });
  }

  handleChangeExample = (evt: { target: { value: string } }) => {
    const { value } = evt.target;
    this.setState({
      code: value === 'none' ? '' : value,
      example: evt.target.value,
    });
    this.transitionToEditMode();
  }

  handleChangeCode = (code: string) => {
    this.setState({ code });
    localStorage.setItem('code', code);
  }

  handleClickEdit = () => {
    this.transitionToEditMode();
  }

  handleClickRun = async () => {
    const { code } = this.state;

    this.hideAllSnackbars();
    this.setState({
      mode: 'running',
      frames: [],
      tasks: [],
      microtasks: [],
      markers: [],
      isAutoPlaying: false,
      currentStep: 'none',
    });

    try {
      const events = await fetchEventsForCode(code);
      this.currEventIdx = 0;
      this.events = events;
      this.setState({ mode: 'visualizing', currentStep: 'evaluateScript' });
    } catch(e) {
      this.currEventIdx = 0;
      this.showSnackbar('error', e.message);
      this.setState({ mode: 'editing', currentStep: 'none' });
    }
  }

  handleClickPauseAutoStep = () => {
    this.setState({ isAutoPlaying: false });
  }

  handleClickAutoStep = () => {
    // TODO: Add isAutoPlaying to state to disable other buttons...
    this.autoPlayEvents();
  }

  handleClickStep = () => {
    this.playNextEvent();
  }

  showSnackbar = (variant: 'info' | 'warning' | 'error', msg: string) => {
    const { enqueueSnackbar } = this.props;
    const key = uuid();
    this.snackbarIds.push(key);
    enqueueSnackbar(msg, {
      key,
      variant,
      autoHideDuration: PRETTY_MUCH_INFINITY,
      action: <IconButton color="inherit"><CloseIcon /></IconButton>,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  }

  hideAllSnackbars = () => {
    const { closeSnackbar } = this.props;
    this.snackbarIds.forEach(id => {
      closeSnackbar(null, 'Programmatically hiding all snackbars', id);
    });
  }

  transitionToEditMode = () => {
    this.hideAllSnackbars();
    this.setState({
      mode: 'editing',
      frames: [],
      tasks: [],
      microtasks: [],
      markers: [],
      isAutoPlaying: false,
      currentStep: 'none',
    });
  }

  indexOfNextEvent = () => {
    const idx = this.events
      .slice(this.currEventIdx)
      .findIndex(isPlayableEvent);
    if (idx === -1) return -1;
    return this.currEventIdx + idx;
  }

  hasReachedEnd = () => this.indexOfNextEvent() === -1;

  hasReachedEndOfEvents = () => this.currEventIdx >= this.events.length;

  getCurrentEvent = () => this.events[this.currEventIdx]

  seekToNextPlayableEvent = () => {
    while (
      !this.hasReachedEndOfEvents() &&
      !isPlayableEvent(this.getCurrentEvent())
    ) {
      /* Process non-playable event... */
      this.currEventIdx += 1;
    }
  }

  // TODO: Handle uncaught errors (e.g. undefined calling undefined function)
  playNextEvent = () => {
    const { markers } = this.state;

    // TODO: Handle trailing non-playable events...
    this.seekToNextPlayableEvent();

    if (!this.getCurrentEvent()) return;

    const {
      type,
      payload: { id, name, callbackName, start, end, message },
    } = this.getCurrentEvent();

    if (type === 'ConsoleLog') this.showSnackbar('info', message);
    if (type === 'ConsoleWarn') this.showSnackbar('warning', message);
    if (type === 'ConsoleError') this.showSnackbar('error', message);
    if (type === 'ErrorFunction') {
      this.showSnackbar('error', `Uncaught Exception in "${name}": ${message}`);
    }
    if (type === 'EnterFunction') {
      this.setState({ markers: markers.concat({ start, end }) });
      this.pushCallStackFrame(name);
    }
    if (type === 'ExitFunction') {
      this.setState({ markers: markers.slice(0, markers.length - 1) });
      this.popCallStackFrame();
    }
    if (type === 'EnqueueMicrotask') this.enqueueMicrotask(name);
    if (type === 'DequeueMicrotask') this.dequeueMicrotask();
    if (type === 'InitTimeout') this.enqueueTask(id, callbackName);
    if (type === 'BeforeTimeout') this.dequeueTask(id);

    this.currEventIdx += 1;
    this.seekToNextPlayableEvent();
    const nextEvent = this.getCurrentEvent();

    const currentStep =
        nextEvent      === undefined          ? 'rerender'
      : nextEvent.type === 'Rerender'         ? 'rerender'
      : nextEvent.type === 'BeforeTimeout'    ? 'runTask'
      : nextEvent.type === 'DequeueMicrotask' ? 'runMicrotasks'
      : undefined;

    if (currentStep) this.setState({ currentStep });

    // Automatically move task functions into the call stack
    if (
      ['DequeueMicrotask', 'BeforeTimeout'].includes(type) &&
      nextEvent.type === 'EnterFunction'
    ) {
      this.playNextEvent();
    }
  }

  autoPlayEvents = () => {
    this.setState({ isAutoPlaying: true }, async () => {
      while (
        this.state.mode === 'visualizing' &&
        this.state.isAutoPlaying
      ) {
        const endReached = this.playNextEvent();
        if (endReached) {
          this.setState({ isAutoPlaying: false });
          break;
        };
        await pause(500);
      }
    });
  }

  pushCallStackFrame = (name: string) => {
    const { frames } = this.state;
    const newFrames = frames.concat({ id: uuid(), name });
    this.setState({ frames: newFrames });
  }

  popCallStackFrame = () => {
    const { frames } = this.state;
    const newFrames = frames.slice(0, frames.length - 1);
    this.setState({ frames: newFrames });
  }

  enqueueMicrotask = (name: string) => {
    const { microtasks } = this.state;
    const newMicrotasks = microtasks.concat({ id: uuid(), name });
    this.setState({ microtasks: newMicrotasks });
  }

  dequeueMicrotask = () => {
    const { microtasks } = this.state;
    const newMicrotasks = microtasks.slice(1);
    this.setState({ microtasks: newMicrotasks });
  }

  enqueueTask = (id: number, name: string) => {
    const { tasks } = this.state;
    const newTasks = tasks.concat({ id, name });
    this.setState({ tasks: newTasks });
  }

  // We can't just pop tasks like we can for the Call Stack and Microtask Queue,
  // because if timers have a delay, their execution order isn't necessarily
  // FIFO.
  dequeueTask = (id: number) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.id !== id);
    this.setState({ tasks: newTasks });
  }

  render() {
    const { tasks, microtasks, frames, markers, mode, example, code, isAutoPlaying, currentStep } = this.state;

    return (
      <AppRoot
        mode={mode}
        example={example}
        code={code}
        tasks={tasks}
        microtasks={microtasks}
        frames={frames}
        markers={markers}
        isAutoPlaying={isAutoPlaying}
        hasReachedEnd={this.hasReachedEnd()}
        currentStep={currentStep}
        onChangeExample={this.handleChangeExample}
        onChangeCode={this.handleChangeCode}
        onClickRun={this.handleClickRun}
        onClickEdit={this.handleClickEdit}
        onClickPauseAutoStep={this.handleClickPauseAutoStep}
        onClickAutoStep={this.handleClickAutoStep}
        onClickStepBack={() => {}}
        onClickStep={this.handleClickStep}
      />
    );
  }
}

const AppWithSnackbar = withSnackbar(App);

export default () => (
  <SnackbarProvider maxSnack={6}>
    <AppWithSnackbar />
  </SnackbarProvider>
);
