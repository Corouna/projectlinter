import React, { useState, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import { Linting, UnitTest, Footer } from './../components';  

const styles = theme => ({
	base: {
		width: 1100,
		paddingTop: 30
	},
});

const Dashboard = props => {
	const { classes } = props;
	const [active, setActive] = useState('Lint');
	const [job, setJob] = useState('Linter');

	/* For showing result of either ESLint or Unit Test */
	const showLinting = useCallback(() => setActive('Lint'), []);
	const showUnitTest = useCallback(() => setActive('UnitTest'), []);

	/* For selecting project to display its result */
	const showSDL = useCallback(() => setJob('Linter'), []);
	const showPM = useCallback(() => setJob('GHTest2'), []);

	return (
		<Grid container className={classes.base}>
			<Grid item xs={6}>
				<Typography variant="h5" style={{ fontWeight: 600 }}>{'Dev Center'}</Typography>
			</Grid>
			<Grid item xs={6} container justify="flex-end">
				<Button onClick={showLinting}><Typography variant="overline">Linting</Typography></Button>
				<Button style={{ marginLeft: 15 }} onClick={showUnitTest}><Typography variant="overline">Unit Test</Typography></Button>
			</Grid>
			<Grid item xs={12} style={{ marginBottom: 10 }}><Divider /></Grid>
			<Grid item xs={12}>
				<Button onClick={showSDL}><Typography variant="overline">SDL</Typography></Button>
				<Button style={{ marginLeft: 15 }} onClick={showPM}><Typography variant="overline">Pixlr Market</Typography></Button>
			</Grid>
			{
				Boolean(active === 'Lint') &&
				<Linting forjob={job} />
			}
			{
				Boolean(active === 'UnitTest') &&
				<UnitTest forjob={job} />
			}
			<Footer />
		</Grid>
	);
}

export default withStyles(styles)(Dashboard);