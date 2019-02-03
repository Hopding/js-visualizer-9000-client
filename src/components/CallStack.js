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

import { getPastelForIndex } from '../styles/colors';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    maxWidth: 225,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    padding: 0,
  },
  content: {
    width: 200,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  frame: {
    width: 160,
    height: 30,
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 1.5,
    textAlign: 'center',
  }
});

const Frame = React.forwardRef(({ classes, name, style }, ref) => (
  <RootRef rootRef={ref}>
    <Paper ref={ref} style={style} className={classes.frame} elevation={1}>
      <Typography variant="h6" color="inherit">
        {name}
      </Typography>
    </Paper>
  </RootRef>
));

const FrameDiv = posed(Frame)({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'tween' },
    }
  },
  exit: {
    y: 200,
    opacity: 0,
    height: 30,
    width: 160,
    transition: {
      y: { type: 'tween' },
    }
  }
});

type Props = {
  classes: any,
  frames: { id: string, name: string }[],
};

class CallStack extends React.Component<Props> {
  state = { contentHeight: undefined, }

  contentRef = React.createRef();

  componentDidMount() {
    // TODO: Make this dynamic. This doesn't relayout if the screen size changes
    const contentHeight = this.contentRef.current.clientHeight;
    this.setState({ contentHeight });
  }

  render() {
    const { classes, frames } = this.props;
    const { contentHeight } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <CardHeader title="Call Stack" className={classes.header} />
          <div
            ref={this.contentRef}
            style={{
              height: contentHeight === undefined ? '100%' : contentHeight,
              overflow: 'scroll',
              paddingRight: 6,
            }}
          >
            {contentHeight !== undefined && (
              <PoseGroup>
                {frames.map(({ id, name }, idx) => (
                  <FrameDiv
                    key={id}
                    classes={classes}
                    name={name}
                    style={{ backgroundColor: getPastelForIndex(idx) }}
                  >
                    {name}
                  </FrameDiv>
                ))}
              </PoseGroup>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(CallStack);
