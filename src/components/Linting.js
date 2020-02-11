import React, { useState, useEffect, Suspense } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, List, CircularProgress } from '@material-ui/core';
import { JenkinsObj, processAsData } from './../utils/Utils';
import {
	SimpleAccordion
} from './../components';

const styles = theme => ({
	base: {
		width: 1100,
		paddingTop: 30
	},
	nested: {
    paddingLeft: theme.spacing(4),
  },
  noboxshadow: {
		boxShadow: 'none'
	}
});

const Linting = props => {
	const { classes } = props;
	const [data, setData] = useState([]);

	const displayMessage = (err, data) => {
		console.log('Can i see what is data ::: ', data);
	}

	/* 
		This is to get the job details 
		We need this to get the builds list
	*/
	const getJobDetail = () => {
		const detail = JenkinsObj.job.get('GHTest2', displayMessage);
	}

	/* Jenkins fetcher */
	const getBuildLog = () => {
		const log = JenkinsObj.build.logStream('GHTest2', 2);

		log.on('data', text => {
			let actualText = text.split('npm run eslint')[1].split('npm ERR! code ELIFECYCLE')[0];
			console.log('Can i see what is actualText ::: ', actualText);
			let data = processAsData(actualText);
			setData(data);
		});
	}

	/* Handler to open the collapse */
	const openThis = id => {
		let f = _.find(data, ['id', id]);
		let newF = { ...f, open: !f.open };
		setData( _.orderBy([ ...data.filter(d => d.id !== id), newF ], ['id', 'asc']) );
	}

	console.log('Can i see what is inside JenkinsObj ::: ', JenkinsObj);
	console.log('Can i test the JenkinsObj ::: ', JenkinsObj.job.get('GHTest2', displayMessage));

	useEffect(() => {
		// getBuildLog();		
	}, []);

	return (
		<Grid item xs={12} container direction="row" className={classes.base}>
			<Grid item xs={12} container justify="center">
				<Typography variant="h5" style={{ fontWeight: 800 }}>LINTING RESULT</Typography>
			</Grid>
			<Grid item xs={12}>
				<div style={{ height: 20 }} />
			</Grid>
			<Grid item xs={12}>
				<Paper style={{ padding: '3%' }} className={classes.noboxshadow}>
					<List
			      component="nav"
			      aria-labelledby="nested-list-subheader"
			    >
						<Suspense fallback={<CircularProgress />}>
							{
								data.map((f, idx) => (
									<SimpleAccordion key={f.id} data={{ ...f, handler: openThis }}  />
								))
							}
						</Suspense>
					</List>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(Linting);

