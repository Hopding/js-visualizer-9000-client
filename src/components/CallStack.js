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
import '../styles/index.css';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    maxWidth: 225,
    minWidth: 225,
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
  state = { contentWidth: undefined, contentHeight: undefined };

  contentRef = React.createRef();

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { width, height } = this.getContentDims();
    this.setState({ contentWidth: width, contentHeight: height });
  }

  getContentDims = () => {
    const contentDiv = this.contentRef.current;
    return contentDiv
      ? { width: contentDiv.clientWidth, height: contentDiv.clientHeight }
      : { width: undefined, height: undefined };
  }

  render() {
    const { classes, frames } = this.props;
    const { contentWidth, contentHeight } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <CardHeader title="Call Stack" className={classes.header} />
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <div ref={this.contentRef} style={{ flex: 1 }} />
            <div
              style={{
                width: contentWidth,
                height: contentHeight,
                position: 'absolute',
              }}
              className="scroll-on-hover-y"
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
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(CallStack);
