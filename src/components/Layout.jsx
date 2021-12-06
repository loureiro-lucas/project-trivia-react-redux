import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import Header from './Header';

const useStyles = makeStyles({
  page: {
    backgroundColor: '#f9f9f9',
  },
  headerTitle: {
    flexGrow: 1,
    paddingLeft: '24px',
  },
});

function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <Header styleClass={ classes.headerTitle } />
      <div className={ classes.page }>
        { children }
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
