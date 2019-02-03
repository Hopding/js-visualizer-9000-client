import React, { Component } from 'react';
import uuid from 'uuid/v4';

import AppRoot from './AppRoot';

const pause = (millis) => new Promise(resolve => setTimeout(resolve, millis));

const isNotIgnoredEvent = ({ type }) => [
  'EnterFunction', 'ExitFunction',
  'EnqueueMicrotask', 'DequeueMicrotask',
  'InitTimeout', 'BeforeTimeout',
].includes(type)

class App extends Component {
  state = {
    frames: [
      // { id: uuid(), name: 'first(1)' },
      // { id: uuid(), name: 'first(2)' },
      // { id: uuid(), name: 'first(3)' },
      // { id: uuid(), name: 'first(4)' },
      // { id: uuid(), name: 'first(5)' },
      // { id: uuid(), name: 'first(6)' },
      // { id: uuid(), name: 'first(7)' },
      // { id: uuid(), name: 'first(8)' },
      // { id: uuid(), name: 'first(9)' },
      // { id: uuid(), name: 'first(10)' },
      // { id: uuid(), name: 'first(1)' },
    ],
    tasks: [
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
      // { id: uuid(), name: 'setTimeout(...)' },
    ],
    microtasks: [],
    markers: [],
    mode: 'editing', // 'editing' | 'running' | 'visualizing'
    code: '',
    isAutoPlaying: false,
  };

  currEventIdx: number = 0;
  events: { type: string, payload: any }[] = [];

  componentDidMount() {
    const code = localStorage.getItem('code') || '';
    this.setState({ code });

    // setInterval(() => {
    //   const { frames, tasks } = this.state;
    //   this.setState({
    //     frames: frames.concat({ id: uuid(), name: 'myFunction()' }),
    //     tasks: tasks.concat({ id: uuid(), name: 'setTimeout(...)' }),
    //   });
    // }, 1000);
    //
    // setTimeout(() => {
    //   setInterval(() => {
    //     const { frames, tasks } = this.state;
    //     this.setState({
    //       frames: frames.slice(0, frames.length - 1),
    //       tasks: tasks.slice(1, tasks.length),
    //     });
    //   }, 1000);
    // }, 7000)
  }

  handleChangeCode = (code: string) => {
    this.setState({ code });
    localStorage.setItem('code', code);
  }

  handleClickEdit = () => {
    this.setState({
      mode: 'editing',
      frames: [],
      tasks: [],
      microtasks: [],
      markers: [],
      isAutoPlaying: false,
    });
  }

  handleClickRun = () => {
    const { code } = this.state;

    this.setState({
      mode: 'running',
      frames: [],
      tasks: [],
      microtasks: [],
      markers: [],
      isAutoPlaying: false,
    });

    try {
      const ws = new WebSocket('ws://localhost:8080');

      ws.addEventListener('open', (event) => {
        const command = { type: 'RunCode', payload: code };
        ws.send(JSON.stringify(command))
      });

      ws.addEventListener('message', (event) => {
        const events = JSON.parse(event.data);
        console.log('RunCode Events:', events);
        this.currEventIdx = 0;
        this.events = events;
        this.setState({ mode: 'visualizing' });
      });
    } catch (e) {
      this.currEventIdx = 0;
      this.setState({ mode: 'editing', markers: [] });
    }
  }

  indexOfNextEvent = () => this.events
    .slice(this.currEventIdx)
    .findIndex(isNotIgnoredEvent);

  hasReachedEnd = () => this.indexOfNextEvent() === -1;

  playNextEvent = () => {
    const { markers } = this.state;

    const idx = this.indexOfNextEvent();
    if (idx === -1) return true;
    this.currEventIdx = this.currEventIdx + idx;

    const {
      type,
      payload: { id, name, callbackName, start, end },
    } = this.events[this.currEventIdx];

    if (type === 'EnterFunction') {
      this.setState({ markers: markers.concat({ start, end }) });
      this.pushCallStackFrame(name);
    }
    if (type === 'ExitFunction') {
      this.setState({ markers: markers.slice(0, markers.length - 1) });
      this.popCallStackFrame();
    }
    if (type === 'EnqueueMicrotask') {
      // this.enqueueMicrotask(`Microtask(${name})`);
      this.enqueueMicrotask(name);
    }
    if (type === 'DequeueMicrotask') {
      this.dequeueMicrotask();
    }
    if (type === 'InitTimeout') {
      // this.enqueueTask(id, `Task(${callbackName})`);
      this.enqueueTask(id, callbackName);
    }
    if (type === 'BeforeTimeout') {
      this.dequeueTask(id);
    }

    this.currEventIdx += 1;
    return false;
  }

  autoPlayEvents = () => {
    this.setState({ isAutoPlaying: true }, async () => {
      while (
        this.currEventIdx < this.events.length &&
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

  render() {
    const { frames, tasks, microtasks, mode, code, isAutoPlaying } = this.state;

    return (
      <AppRoot
        mode={mode}
        code={code}
        tasks={tasks}
        microtasks={microtasks}
        frames={frames}
        isAutoPlaying={isAutoPlaying}
        hasReachedEnd={this.hasReachedEnd()}
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

export default App;
