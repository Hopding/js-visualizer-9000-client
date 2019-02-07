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

import { getPastelForIndex } from '../styles/colors';
import '../styles/index.css';
import CardHeaderWithAbout from './CardHeaderWithAbout';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    maxWidth: 230,
    minWidth: 230,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    width: 200,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  frame: {
    width: 165,
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
    width: 165,
    transition: {
      y: { type: 'tween' },
    }
  },
  exit: {
    y: -200,
    opacity: 0,
    height: 30,
    width: 165,
    transition: {
      y: { type: 'tween' },
    }
  }
});

type Props = {
  classes: any,
  frames: { id: string, name: string }[],
  onClickAbout: void => any,
};

class CallStack extends React.Component<Props> {
  state = { width: undefined, height: undefined };

  handleResize = ({ bounds: { width, height } }) => {
    this.setState({ width, height });
  }

  render() {
    const { classes, frames, onClickAbout } = this.props;
    const { width, height } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <CardHeaderWithAbout title="Call Stack" onClickAbout={onClickAbout} />
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <Measure bounds onResize={this.handleResize}>
              {({ measureRef: ref }) => <div ref={ref} style={{ flex: 1 }} />}
            </Measure>
            <div
              style={{ width, height, position: 'absolute' }}
              className="scroll-on-hover-y"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  minHeight: height,
                }}
              >
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(CallStack);
