import React, { useState, useCallback } from 'react';
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
	const [job, setJob] = useState('Linter')

	const showSDL = useCallback(() => setJob('Linter'), []);
	const showPM = useCallback(() => setJob('GHTest2'), []);

	return (
		<Grid container className={classes.base}>
			<Grid item xs={6}>
				<Typography variant="h5" style={{ fontWeight: 600 }}>{'Test centre'}</Typography>
			</Grid>
			<Grid item xs={6} container justify="flex-end">
				<Button><Typography variant="overline">Linting</Typography></Button>
				<Button style={{ marginLeft: 15 }}><Typography variant="overline">Unit Test</Typography></Button>
			</Grid>
			<Grid item xs={12} style={{ marginBottom: 10 }}><Divider /></Grid>
			<Grid item xs={12}>
				<Button onClick={showSDL}><Typography variant="overline">SDL</Typography></Button>
				<Button style={{ marginLeft: 15 }} onClick={showPM}><Typography variant="overline">Pixlr Market</Typography></Button>
			</Grid>
			<Linting forjob={job} />
		</Grid>
	);
}

export default withStyles(styles)(Dashboard);