import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, List, CircularProgress } from '@material-ui/core';
import { SyncLoader } from 'react-spinners';
import { JenkinsObj, processJestAsData } from './../utils/Utils';
import {
	UnitTestAccordion
} from './../components';

const windowHeight = window.innerHeight;
const contentHeight = windowHeight - 126 - 65 - 10; // Height of header part is 126 and footer is 65. 10 is the mmargin bottom for this linting page.

const styles = theme => ({
	base: {
		minHeight: contentHeight / 2,
		height: 'auto',
		maxHeight: contentHeight,
		overflowY: 'scroll',
		marginBottom: 10
	},
	nested: {
    paddingLeft: theme.spacing(4),
  },
  noboxshadow: {
		boxShadow: 'none'
	}
});

const UnitTest = props => {
	const { classes, forjob } = props;
	const [build, setBuild] = useState(0); // Get the amount of builds from Jenkins. Biggest number indicate the latest build
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	/* 
		This is to get the job details 
		We need this to get the builds list
	*/
	const getJobDetail = jobname => {
		setLoading(true);

		// console.log('Calling getJobDetail for job ::: ', jobname);

		JenkinsObj.job.get(jobname, (err, job) => {
			if (err) throw err;

			// console.log('Can i see what is job ::: ', job);

			let buildTotal = job.builds.length;
			setBuild(job.builds.length);
		});
	}

	/* Jenkins fetcher */
	const getBuildLog = jobname => {
		// console.log('Getting build log now, for job ::: ', jobname);

		const log = JenkinsObj.build.logStream(jobname, build);

		log.on('data', text => {
			// console.log('Can i see what is data ::: ', text.split('> jest --verbose ./test')[1].split('+ echo ****** End of Jest process ******')[0]);

			let actualText = text.split('> jest --verbose ./test')[1].split("Test Suites:")[0];
			let data = processJestAsData(actualText);
			setLoading(false);
			setData(data);
		});
	}

	/* Handler to open the collapse */
	const openThis = id => {
		let f = _.find(data, ['id', id]);
		let newF = { ...f, open: !f.open };
		setData( _.orderBy([ ...data.filter(d => d.id !== id), newF ], ['id', 'asc']) );
	}

	useEffect(() => {
		if (forjob){
			getJobDetail(forjob);
		}
	}, [forjob]);

	useEffect(() => {
		if (build){
			getBuildLog(forjob);
		}
	}, [build]);

	return (
		<Grid item xs={12} container direction="row" className={classes.base}>
			<Grid item xs={12} container justify="center">
				<Typography variant="h5" style={{ fontWeight: 800 }}>UNIT TEST RESULT</Typography>
			</Grid>
			<Grid item xs={12}>
				<div style={{ height: 20 }} />
			</Grid>
			<Grid item xs={12}>
				<Paper style={{ padding: '3%' }} className={classes.noboxshadow}>
					{ !loading && 
						<List
				      component="nav"
				      aria-labelledby="nested-list-subheader"
				    >
							{
								data.map((f, idx) => (
									<UnitTestAccordion key={f.id} data={{ ...f, handler: openThis }}  />
								))
							}
						</List>
					}
					{
						loading && 
						<Grid container justify="center">
							<SyncLoader size={15} color="#2BCCE4" loading={loading} />
						</Grid>
					}
				</Paper>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(UnitTest);