import React from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, List, CircularProgress } from '@material-ui/core';
import { SyncLoader } from 'react-spinners';
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

const UnitTest = props => {
	const { classes,  } = props;

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
					<Typography variant="body1" align="center">Nothing to display yet.</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(UnitTest);
