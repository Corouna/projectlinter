import React from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';

const styles = theme => ({

});

const Footer = props => {
	const { classes,  } = props;

	return (
		<Grid item xs={12} container direction="row">
			<Grid item xs={12} style={{ marginBottom: 20 }}><Divider /></Grid>
			<Grid item xs={12} style={{ marginBottom: 20 }}>
				<Typography variant="body1" align="center">{'© 2019 Dev Centre'}</Typography>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(Footer);