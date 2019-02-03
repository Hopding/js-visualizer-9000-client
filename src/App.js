import React, { Component } from 'react';
import uuid from 'uuid/v4';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SendIcon from '@material-ui/icons/Send';
import CodeIcon from '@material-ui/icons/Code';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';
import FastForwardIcon from '@material-ui/icons/FastForward';

import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';

import JavaScriptLogo from './js-logo.png';
import CodeEditor from './CodeEditor';
import CallStack from './CallStack';
import TaskQueue from './TaskQueue';
import MicrotaskQueue from './MicrotaskQueue';

const theme = createMuiTheme({
  palette: {
    primary: yellow,
    secondary: orange,
  },
});

const stylesX = theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit,
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },

  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },

  tableRoot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 700,
  },
});

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  jsLogo: {
    width: 40,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,

    // From: https://codepen.io/sdthornton/pen/wBZdXq
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
};

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
  };

  componentDidMount() {
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

  handleEdit = () => {
    this.setState({ mode: 'editing' });
  }

  handleRun = () => {
    this.setState({ mode: 'visualizing' });
  }

  render() {
    const { classes } = this.props;
    const { frames, tasks, mode } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div style={{
          backgroundColor: blueGrey['100'],
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }}>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <img style={styles.jsLogo} src={JavaScriptLogo} alt="" />
              <Typography variant="h5" color="inherit">
                JavaScript Visualizer 9000
              </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <form className={classes.form} autoComplete="off">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="example">Example</InputLabel>
                  <Select
                    value="example"
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'example-name',
                      id: 'example-id',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="exampleOne">Example One</MenuItem>
                    <MenuItem value="exampleTwo">Example Two</MenuItem>
                    <MenuItem value="exampleThree">Example Three</MenuItem>
                  </Select>
                </FormControl>
              </form>
              <div>
              {
                mode === 'editing' ? (
                  <Button
                    style={{ backgroundColor: green['500'], color: '#ffffff' }}
                    variant="contained"
                    className={classes.button}
                    onClick={this.handleRun}
                  >
                    Run
                    <SendIcon className={classes.rightIcon}>Run</SendIcon>
                  </Button>
                ) : mode === 'visualizing' ? (
                  <Button
                    style={{ backgroundColor: blue['300'], color: '#ffffff' }}
                    variant="contained"
                    className={classes.button}
                    onClick={this.handleEdit}
                  >
                    Edit
                    <CodeIcon className={classes.rightIcon}>Edit</CodeIcon>
                  </Button>
                ) : new Error(`Invalid mode: ${mode}`)
              }
              </div>
            </div>
            <CodeEditor locked={mode !== 'editing'} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div>
              <TaskQueue tasks={tasks} />
              <MicrotaskQueue microtasks={tasks} />
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
              <CallStack frames={frames} />
              <div>
                {/*<Stepper style={{ backgroundColor: 'transparent' }} activeStep={0} orientation="vertical">*/}
                <Stepper style={{ backgroundColor: 'transparent' }} activeStep={0} alternativeLabel>
                  {['Task Step', 'Microtask Step', 'Rerender Step'].map((label, index) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                      {/*<StepContent>
                        <Typography>Stuff and things!</Typography>
                      </StepContent>*/}
                    </Step>
                  ))}
                </Stepper>
              </div>
              <div>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Stuff</TableCell>
                      <TableCell align="right">Things</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">Foo</TableCell>
                      <TableCell align="right">Bar</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Qux</TableCell>
                      <TableCell align="right">Baz</TableCell>
                    </TableRow>
                  </TableBody>
                  {/*<TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>*/}
                </Table>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 15,
            right: 15,
            overflow: 'hidden',
          }}>
            <Slide style={{ transitionDelay: '200ms' }} direction="left" in={mode === 'visualizing'}>
              <Tooltip title="Auto Step" aria-label="Auto Step" placement="left">
                <Fab
                  style={{ backgroundColor: blue['500'], color: '#ffffff' }}
                  color="primary"
                  size="medium"
                  aria-label="Add"
                  className={classes.fab}
                >
                  <FastForwardIcon />
                </Fab>
              </Tooltip>
            </Slide>
            <Slide style={{ transitionDelay: '100ms' }} direction="left" in={mode === 'visualizing'}>
              <Tooltip title="Step Back" aria-label="Step Back" placement="left">
                <Fab
                  style={{ backgroundColor: pink['500'], color: '#ffffff' }}
                  color="secondary"
                  size="medium"
                  aria-label="Edit"
                  className={classes.fab}
                >
                  <ReplayIcon />
                </Fab>
              </Tooltip>
            </Slide>
            <Slide style={{ transitionDelay: '0ms' }} direction="left" in={mode === 'visualizing'}>
              <Fab
                style={{ backgroundColor: green['500'], color: '#ffffff' }}
                variant="extended"
                size="large"
                aria-label="Delete"
                className={classes.fab}
              >
                <PlayArrowIcon className={classes.extendedIcon} />
                Step
              </Fab>
            </Slide>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(stylesX)(App);
