import React, { Component } from 'react';
import uuid from 'uuid/v4';

import AppRoot from './AppRoot';

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
    mode: 'editing', // 'editing' | 'visualizing'
    code: '',
  };

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

  handleEdit = () => {
    this.setState({ mode: 'editing' });
  }

  handleRun = () => {
    this.setState({ mode: 'visualizing' });
  }

  render() {
    const { frames, tasks, mode, code } = this.state;

    return (
      <AppRoot
        mode={mode}
        code={code}
        tasks={tasks}
        microtasks={tasks}
        frames={frames}
        onChangeCode={this.handleChangeCode}
        onClickRun={this.handleRun}
        onClickEdit={this.handleEdit}
        onClickAutoStep={() => {}}
        onClickStepBack={() => {}}
        onClickStep={() => {}}
      />
    );
  }
}

export default App;
