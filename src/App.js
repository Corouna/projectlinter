import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const styles = theme => ({ 
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(255, 255, 255,0.8)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      outline: '1px solid slategrey'
    }
  },
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
