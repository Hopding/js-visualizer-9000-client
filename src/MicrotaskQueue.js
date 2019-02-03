/* @flow */
import React from 'react';
import posed, { PoseGroup } from 'react-pose'

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
  microtask: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    margin: theme.spacing.unit,
    display: 'inline-block',
  },
});

const Microtask = React.forwardRef(({ classes, name }, ref) => (
  <RootRef rootRef={ref}>
    <Paper className={classes.microtask} elevation={1}>
      <Typography variant="h6" color="inherit">
        {name}
      </Typography>
    </Paper>
  </RootRef>
));

const MicrotaskDiv = posed(Microtask)({
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
  microtasks: { id: string, name: string }[],
};

class MicrotaskQueue extends React.Component<Props> {
  state = { contentWidth: undefined, }

  contentRef = React.createRef();

  componentDidMount() {
    // TODO: Make this dynamic. This doesn't relayout if the screen size changes
    const contentWidth = this.contentRef.current.clientWidth;
    this.setState({ contentWidth });
  }

  render() {
    const { classes, microtasks } = this.props;
    const { contentWidth } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <CardHeader title="Microtask Queue" className={classes.header} />
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
                {microtasks.map(({ id, name }, idx) => (
                  <MicrotaskDiv
                    key={id}
                    classes={classes}
                    name={name}
                    style={{ backgroundColor: pastels[idx] }}
                  >
                    {name}
                  </MicrotaskDiv>
                ))}
              </PoseGroup>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(MicrotaskQueue);
