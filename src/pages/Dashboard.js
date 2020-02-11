import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import { Linting } from './../components';  

const styles = theme => ({
	base: {
		width: 1100,
		paddingTop: 30
	},
});

const Dashboard = props => {
	const { classes } = props;

	return (
		<Grid container className={classes.base}>
			<Grid item xs={12}>
				<Typography variant="h5" style={{ fontWeight: 600 }}>{'Test centre'}</Typography>
				<Typography variant="overline">For SDL and Pixlr Market</Typography>
			</Grid>
			<Grid item xs={12} style={{ marginBottom: 10 }}><Divider /></Grid>
			<Grid item xs={12}>
				<Button><Typography variant="overline">SDL</Typography></Button>
				<Button style={{ marginLeft: 15 }}><Typography variant="overline">Pixlr Market</Typography></Button>
			</Grid>
			<Linting />
		</Grid>
	);
}

export default withStyles(styles)(Dashboard);