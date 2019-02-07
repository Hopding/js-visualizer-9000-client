/* @flow */
import React from 'react';

import Typography from '@material-ui/core/Typography';

import JavaScriptLogo from '../assets/js-logo.png';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  jsLogo: {
    width: 40,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    cursor: 'pointer',

    // From: https://codepen.io/sdthornton/pen/wBZdXq
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
}

const Header = ({
  onClickLogo,
}: {|
  onClickLogo: void => any,
|}) => (
  <div style={styles.container}>
    <img
      style={styles.jsLogo}
      src={JavaScriptLogo}
      alt=""
      onClick={onClickLogo}
    />
    <Typography variant="h5" color="inherit">
      JavaScript Visualizer 9000
    </Typography>
  </div>
);

export default Header;
