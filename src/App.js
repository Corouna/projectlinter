import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const styles = theme => ({ 
	container: {
		display: 'flex',
		justifyContent: 'center'
	}
});

const App = props => {
	const { classes } = props;

  return (
  	<div className={classes.container}>
	    <BrowserRouter>
	      <Routes />
	    </BrowserRouter>
    </div>
  );
}

export default withStyles(styles)(App);
