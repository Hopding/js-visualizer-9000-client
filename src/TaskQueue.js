/* @flow */
import React from 'react';
import posed, { PoseGroup } from 'react-pose'
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { pastels } from './colors';

const styles = theme => ({
  card: {
    maxHeight: 140,
    margin: theme.spacing.unit,
    height: 120,
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    padding: 0,
  },
  content: {
  },
  task: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    margin: theme.spacing.unit,
    display: 'inline-block',
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
  tasks: { id: string, name: string }[],
};

class TaskQueue extends React.Component<Props> {
  state = { contentWidth: undefined, }

  contentRef = React.createRef();

  componentDidMount() {
    // TODO: Make this dynamic. This doesn't relayout if the screen size changes
    const contentWidth = this.contentRef.current.clientWidth;
    this.setState({ contentWidth });
  }

  render() {
    const { classes, tasks } = this.props;
    const { contentWidth } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <CardHeader title="Task Queue" className={classes.header} />
          <div
            ref={this.contentRef}
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: contentWidth === undefined ? '100%' : contentWidth,
              overflow: 'scroll',
              maxHeight: 70,
              paddingBottom: 5.5,
            }}
          >
            {contentWidth !== undefined && (
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
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(TaskQueue);
