/* @flow */
import React from 'react';
import posed, { PoseGroup } from 'react-pose'
import Measure from 'react-measure';

import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { pastels } from '../styles/colors';
import '../styles/index.css';
import CardHeaderWithAbout from './CardHeaderWithAbout';

const styles = theme => ({
  card: {
    maxHeight: 140,
    margin: theme.spacing.unit,
    height: 120,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  task: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    margin: theme.spacing.unit,
    display: 'inline-block',
    textAlign: 'center',
    minWidth: 125,
  },
});

const Task = React.forwardRef(({ classes, name }, ref) => (
  <RootRef rootRef={ref}>
    <Paper ref={ref} className={classes.task} elevation={1}>
      <Typography style={{ fontSize: 20 }} color="inherit">
        {name}
      </Typography>
    </Paper>
  </RootRef>
));

const TaskDiv = posed(Task)({
  preEnter: {
    x: 200,
    opacity: 1,
    height: 25,
    width: 140,
    transition: {
      x: { type: 'tween' },
    }
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'tween' },
    }
  },
  exit: {
    x: -200,
    opacity: 0,
    height: 25,
    width: 140,
    transition: {
      x: { type: 'tween' },
    }
  }
});

type Props = {
  classes: any,
  title: string,
  tasks: { id: string, name: string }[],
  onClickAbout: void => any,
};

class TaskQueue extends React.Component<Props> {
  state = { width: undefined, height: undefined };

  handleResize = ({ bounds: { width, height } }) => {
    this.setState({ width, height });
  }

  render() {
    const { classes, tasks, title, onClickAbout } = this.props;
    const { width, height } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <CardHeaderWithAbout title={title} onClickAbout={onClickAbout} slideButtonLeft />
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <Measure bounds onResize={this.handleResize}>
              {({ measureRef: ref }) => <div ref={ref} style={{ flex: 1 }} />}
            </Measure>
            <div
              style={{
                width,
                height,
                position: 'absolute',
                display: 'flex',
                flexWrap: 'nowrap',
                flexDirection: 'row',
                paddingBottom: 20,
              }}
              className="scroll-on-hover-x"
            >
              <PoseGroup preEnterPose="preEnter">
                {tasks.map(({ id, name }, idx) => (
                  <TaskDiv
                    key={id}
                    classes={classes}
                    name={name}
                    style={{ backgroundColor: pastels[idx] }}
                  >
                    {name}
                  </TaskDiv>
                ))}
              </PoseGroup>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(TaskQueue);
