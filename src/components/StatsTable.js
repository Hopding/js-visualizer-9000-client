/* @flow */
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';

const themedStyles = theme => ({
  tableRoot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 700,
  },
});

const StatsTable = ({
  classes,
}: {|
  classes: any,
|}) => (
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
    </Table>
  </div>
);

export default withStyles(themedStyles)(StatsTable);
