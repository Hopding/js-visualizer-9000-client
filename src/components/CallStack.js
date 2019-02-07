/* @flow */
import React from 'react';
import posed, { PoseGroup } from 'react-pose'

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
    const { classes, frames, onClickAbout } = this.props;
    const { contentWidth, contentHeight } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <CardHeaderWithAbout title="Call Stack" onClickAbout={onClickAbout} />
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  minHeight: contentHeight,
                }}
              >
                {/*<PoseGroup preEnterPose="preEnter">*/}
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
