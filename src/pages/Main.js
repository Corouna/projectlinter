import React, { useState, useEffect, Suspense, Fragment } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Collapse, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import { InsertDriveFile, ExpandMore, ExpandLess } from '@material-ui/icons';
import { JenkinsObj, processAsData } from './../utils/Utils';

const styles = theme => ({
	base: {
		paddingTop: '5%',
		paddingBottom: '5%',
		paddingLeft: '5%',
		paddingRight: '5%'
	},
	nested: {
    paddingLeft: theme.spacing(4),
  }
});

const Main = props => {
	const { classes } = props;
	const [data, setData] = useState([]);
	const [open, setOpen] = useState(true);

	const getBuildLog = () => {
		const log = JenkinsObj.build.logStream('GHTest2', 2);

		log.on('data', text => {
			let data = processAsData(text);
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
		getBuildLog();		
	}, []);

	return (
		<Grid container direction="row" className={classes.base} style={{ backgroundColor: '#D4D4D4' }}>
			<Grid item xs={12} container justify="center">
				<Typography variant="h5" style={{ fontWeight: 800 }}>LINTING RESULT</Typography>
			</Grid>
			<Grid item xs={12}>
				<div style={{ height: 20 }} />
			</Grid>
			<Grid item xs={12}>
				<Paper style={{ padding: '3%' }}>
					<List
			      component="nav"
			      aria-labelledby="nested-list-subheader"
			    >
						<Suspense fallback={<CircularProgress />}>
							{
								data.map(f => (
									<Fragment key={f.id}>
										<ListItem button onClick={() => openThis(f.id)}>
							        <ListItemIcon>
							          <InsertDriveFile />
							        </ListItemIcon>
							        <ListItemText primary={f.file} />
							        {f.open ? <ExpandLess /> : <ExpandMore />}
							      </ListItem>
										<Collapse in={f.open} timeout="auto" unmountOnExit>
							        <Typography variant="body2">Yes you see!</Typography>
							      </Collapse>
						      </Fragment>
								))
							}
						</Suspense>
					</List>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(Main);

