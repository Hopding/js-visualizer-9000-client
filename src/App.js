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
import DEFAULT_CODE from './assets/defaultCode';

const pause = millis => new Promise(resolve => setTimeout(resolve, millis));

const isPlayableEvent = ({ type }) =>
  [
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
    // tasks: _.range(15).map(id => ({ id, name: 'setTimeout' })),
    // microtasks: _.range(15).map(id => ({ id, name: 'resolve' })),
    // frames: _.range(20).map(id => ({ id, name: 'foo()' })),
    tasks: [],
    microtasks: [],
    frames: [],
    markers: [],
    mode: 'editing', // 'editing' | 'running' | 'visualizing'
    code: DEFAULT_CODE,
    isAutoPlaying: false,
    currentStep: 'none', // 'none' | 'runTask' | 'runMicrotasks' | 'rerender',
    example: 'none',
    isDrawerOpen: false,
    visiblePanels: {
      taskQueue: true,
      microtaskQueue: true,
      callStack: true,
      eventLoop: true,
    },
    showCallStackDescription: false,
    showEventLoopDescription: false,
    showTaskQueueDescription: false,
    showMicrotaskQueueDescription: false,
  };

  currEventIdx: number = 0;
  events: { type: string, payload: any }[] = [];
  snackbarIds: string[] = [];

  componentDidMount() {
    const search = new URLSearchParams(window.location.search);
    const code = atob(search.get('code') || '') || localStorage.getItem('code') || DEFAULT_CODE;
    this.setState({ code });
  }

  handleOpenDrawer = () => this.setState({ isDrawerOpen: true });
  handleCloseDrawer = () => this.setState({ isDrawerOpen: false });

  handleChangeVisiblePanel = (panel: string) => () => {
    const { visiblePanels } = this.state;
    const current = visiblePanels[panel];
    this.setState({ visiblePanels: { ...visiblePanels, [panel]: !current } });
  };

  handleShowCallStackDescription = () =>
    this.setState({ showCallStackDescription: true });
  handleHideCallStackDescription = () =>
    this.setState({ showCallStackDescription: false });

  handleShowEventLoopDescription = () =>
    this.setState({ showEventLoopDescription: true });
  handleHideEventLoopDescription = () =>
    this.setState({ showEventLoopDescription: false });

  handleShowTaskQueueDescription = () =>
    this.setState({ showTaskQueueDescription: true });
  handleHideTaskQueueDescription = () =>
    this.setState({ showTaskQueueDescription: false });

  handleShowMicrotaskQueueDescription = () =>
    this.setState({ showMicrotaskQueueDescription: true });
  handleHideMicrotaskQueueDescription = () =>
    this.setState({ showMicrotaskQueueDescription: false });

  handleChangeExample = (evt: { target: { value: string } }) => {
    const { value } = evt.target;
    this.setState({
      code: value === 'none' ? '' : value,
      example: evt.target.value,
    });
    this.transitionToEditMode();
  };

  handleChangeCode = (code: string) => {
    this.setState({ code });
    localStorage.setItem('code', code);
  };

  handleClickEdit = () => {
    this.transitionToEditMode();
  };

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
    } catch (e) {
      this.currEventIdx = 0;
      this.showSnackbar('error', e.message);
      this.setState({ mode: 'editing', currentStep: 'none' });
      console.error(e);
    }
  };

  handleClickPauseAutoStep = () => {
    this.setState({ isAutoPlaying: false });
  };

  handleClickAutoStep = () => {
    // TODO: Add isAutoPlaying to state to disable other buttons...
    this.autoPlayEvents();
  };

  handleClickStep = () => {
    this.playNextEvent();
  };

  showSnackbar = (variant: 'info' | 'warning' | 'error', msg: string) => {
    const { enqueueSnackbar } = this.props;
    const key = uuid();
    this.snackbarIds.push(key);
    enqueueSnackbar(msg, {
      key,
      variant,
      autoHideDuration: PRETTY_MUCH_INFINITY,
      action: (
        <IconButton color="inherit">
          <CloseIcon />
        </IconButton>
      ),
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  hideAllSnackbars = () => {
    const { closeSnackbar } = this.props;
    this.snackbarIds.forEach(id => {
      closeSnackbar(null, 'Programmatically hiding all snackbars', id);
    });
  };

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
  };

  hasReachedEnd = () => this.currEventIdx >= this.events.length;

  getCurrentEvent = () => this.events[this.currEventIdx];

  seekToNextPlayableEvent = () => {
    while (!this.hasReachedEnd() && !isPlayableEvent(this.getCurrentEvent())) {
      /* Process non-playable event: */
      const {
        type,
        payload: { name, message },
      } = this.getCurrentEvent();
      if (type === 'UncaughtError') {
        this.showSnackbar('error', `Uncaught ${name} Exception: ${message}`);
      }
      if (type === 'EarlyTermination') {
        this.showSnackbar('warning', message);
      }

      this.currEventIdx += 1;
    }
  };

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
      nextEvent === undefined
        ? 'rerender'
        : nextEvent.type === 'Rerender'
        ? 'rerender'
        : nextEvent.type === 'BeforeTimeout'
        ? 'runTask'
        : nextEvent.type === 'DequeueMicrotask'
        ? 'runMicrotasks'
        : undefined;

    if (currentStep) this.setState({ currentStep });

    // Automatically move task functions into the call stack
    if (
      ['DequeueMicrotask', 'BeforeTimeout'].includes(type) &&
      nextEvent.type === 'EnterFunction'
    ) {
      this.playNextEvent();
    }
  };

  autoPlayEvents = () => {
    this.setState({ isAutoPlaying: true }, async () => {
      while (this.state.mode === 'visualizing' && this.state.isAutoPlaying) {
        const endReached = this.playNextEvent();
        if (endReached) {
          this.setState({ isAutoPlaying: false });
          break;
        }
        await pause(500);
      }
    });
  };

  // playEventBackwards = () => {
  //   const { markers } = this.state;
  //
  //   // TODO: Handle trailing non-playable events...
  //   this.seekToNextPlayableEvent();
  //
  //   if (!this.getCurrentEvent()) return;
  //
  //   const {
  //     type,
  //     payload: { id, name, callbackName, start, end, message },
  //   } = this.getCurrentEvent();
  //
  //   if (type === 'ConsoleLog') this.showSnackbar('info', message);
  //   if (type === 'ConsoleWarn') this.showSnackbar('warning', message);
  //   if (type === 'ConsoleError') this.showSnackbar('error', message);
  //   if (type === 'ErrorFunction') {
  //     this.showSnackbar('error', `Uncaught Exception in "${name}": ${message}`);
  //   }
  //   if (type === 'EnterFunction') {
  //     this.setState({ markers: markers.concat({ start, end }) });
  //     this.pushCallStackFrame(name);
  //   }
  //   if (type === 'ExitFunction') {
  //     this.setState({ markers: markers.slice(0, markers.length - 1) });
  //     this.popCallStackFrame();
  //   }
  //   if (type === 'EnqueueMicrotask') this.enqueueMicrotask(name);
  //   if (type === 'DequeueMicrotask') this.dequeueMicrotask();
  //   if (type === 'InitTimeout') this.enqueueTask(id, callbackName);
  //   if (type === 'BeforeTimeout') this.dequeueTask(id);
  //
  //   this.currEventIdx += 1;
  //   this.seekToNextPlayableEvent();
  //   const nextEvent = this.getCurrentEvent();
  //
  //   const currentStep =
  //       nextEvent      === undefined          ? 'rerender'
  //     : nextEvent.type === 'Rerender'         ? 'rerender'
  //     : nextEvent.type === 'BeforeTimeout'    ? 'runTask'
  //     : nextEvent.type === 'DequeueMicrotask' ? 'runMicrotasks'
  //     : undefined;
  //
  //   if (currentStep) this.setState({ currentStep });
  //
  //   // Automatically move task functions into the call stack
  //   if (
  //     ['DequeueMicrotask', 'BeforeTimeout'].includes(type) &&
  //     nextEvent.type === 'EnterFunction'
  //   ) {
  //     this.playNextEvent();
  //   }
  // }

  pushCallStackFrame = (name: string) => {
    const { frames } = this.state;
    const newFrames = frames.concat({ id: uuid(), name });
    this.setState({ frames: newFrames });
  };

  popCallStackFrame = () => {
    const { frames } = this.state;
    const newFrames = frames.slice(0, frames.length - 1);
    this.setState({ frames: newFrames });
  };

  enqueueMicrotask = (name: string) => {
    const { microtasks } = this.state;
    const newMicrotasks = microtasks.concat({ id: uuid(), name });
    this.setState({ microtasks: newMicrotasks });
  };

  dequeueMicrotask = () => {
    const { microtasks } = this.state;
    const newMicrotasks = microtasks.slice(1);
    this.setState({ microtasks: newMicrotasks });
  };

  enqueueTask = (id: number, name: string) => {
    const { tasks } = this.state;
    const newTasks = tasks.concat({ id, name });
    this.setState({ tasks: newTasks });
  };

  // We can't just pop tasks like we can for the Call Stack and Microtask Queue,
  // because if timers have a delay, their execution order isn't necessarily
  // FIFO.
  dequeueTask = (id: number) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.id !== id);
    this.setState({ tasks: newTasks });
  };

  render() {
    const {
      tasks,
      microtasks,
      frames,
      markers,
      mode,
      example,
      code,
      isAutoPlaying,
      isDrawerOpen,
      visiblePanels,
      currentStep,
      showCallStackDescription,
      showEventLoopDescription,
      showTaskQueueDescription,
      showMicrotaskQueueDescription,
    } = this.state;

    return (
      <AppRoot
        mode={mode}
        example={example}
        code={code}
        tasks={tasks}
        microtasks={microtasks}
        frames={frames}
        markers={markers}
        visiblePanels={visiblePanels}
        isAutoPlaying={isAutoPlaying}
        isDrawerOpen={isDrawerOpen}
        showCallStackDescription={showCallStackDescription}
        showEventLoopDescription={showEventLoopDescription}
        showTaskQueueDescription={showTaskQueueDescription}
        showMicrotaskQueueDescription={showMicrotaskQueueDescription}
        hasReachedEnd={this.hasReachedEnd()}
        currentStep={currentStep}
        onChangeVisiblePanel={this.handleChangeVisiblePanel}
        onCloseDrawer={this.handleCloseDrawer}
        onOpenDrawer={this.handleOpenDrawer}
        onChangeExample={this.handleChangeExample}
        onChangeCode={this.handleChangeCode}
        onClickRun={this.handleClickRun}
        onClickEdit={this.handleClickEdit}
        onClickPauseAutoStep={this.handleClickPauseAutoStep}
        onClickAutoStep={this.handleClickAutoStep}
        onClickStepBack={() => {}}
        onClickStep={this.handleClickStep}
        onShowCallStackDescription={this.handleShowCallStackDescription}
        onHideCallStackDescription={this.handleHideCallStackDescription}
        onShowEventLoopDescription={this.handleShowEventLoopDescription}
        onHideEventLoopDescription={this.handleHideEventLoopDescription}
        onShowTaskQueueDescription={this.handleShowTaskQueueDescription}
        onHideTaskQueueDescription={this.handleHideTaskQueueDescription}
        onShowMicrotaskQueueDescription={
          this.handleShowMicrotaskQueueDescription
        }
        onHideMicrotaskQueueDescription={
          this.handleHideMicrotaskQueueDescription
        }
      />
    );
  }
}

const AppWithSnackbar = withSnackbar(App);

export default () => (
  <SnackbarProvider maxSnack={4}>
    <AppWithSnackbar />
  </SnackbarProvider>
);
