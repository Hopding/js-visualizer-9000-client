/* @flow */
import React from 'react';
import AceEditor from 'react-ace';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/solarized_light';

import '../styles/colors.css';
import { getPastelIndexFor } from '../styles/colors';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    margin: theme.spacing.unit,
    // backgroundColor: '#fbf1d3',
    // backgroundColor: '#ffffff',
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    display: 'flex',
  },
});

const convertCodeIndexToRowCol = (code, index) => {
  let col = 0;
  let row = 0;
  let head = 0;
  while (head < index) {
    col += 1;

    if (code[head - 1] === '\n') {
      row += 1;
      col = 1;
    }

    head += 1;
    if (head >= code.length) {
      throw new Error(`head=${head}, code.length=${code.length}`)
    }
  }

  if (code[head - 1] === '\n') {
    row += 1;
    col = 0;
  }

  return { row, col };
};

const CodeEditor = ({
  classes,
  code = '',
  markers = [],
  onChangeCode = undefined,
  locked = false,
}: {|
  classes: any,
  code: string,
  markers?: { start: number, end: number }[],
  onChangeCode: string => any,
  locked: booleanm
|}) => (
  <Paper className={classes.root} elevation={1}>
    <AceEditor
      style={{
        maxWidth: 500,
        height: '100%',
        marginLeft: -15,
        marginRight: -15,
      }}
      readOnly={locked}
      value={code}
      mode="javascript"
      theme="solarized_light"
      onChange={onChangeCode}
      name="code-editor"
      fontSize={14}
      tabSize={2}
      markers={
        markers.map(({ start, end }, idx) => ({
          startRow: convertCodeIndexToRowCol(code, start).row,
          startCol: convertCodeIndexToRowCol(code, start).col,
          endRow: convertCodeIndexToRowCol(code, end).row,
          endCol: convertCodeIndexToRowCol(code, end).col,
          className: `active-function-marker${getPastelIndexFor(idx)}`,
          type: 'text',
        }))
      }
      showGutter
      highlightActiveLine={!locked}
      showLineNumbers
      editorProps={{ $blockScrolling: Infinity }}
      focus
    />
  </Paper>
);

export default withStyles(styles)(CodeEditor);
