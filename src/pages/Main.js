import React, { useEffect } from 'react';
import Jenkins from 'jenkins';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const styles = theme => ({
	base: {
		paddingTop: '5%',
		paddingBottom: '5%',
		paddingLeft: '5%',
		paddingRight: '5%'
	}
});

const jenkinsConfig = {
	baseUrl : 'http://root:root@bf147eb3.ngrok.io',
	crumbIssuer: true
}

const Main = props => {
	const { classes } = props;

	useEffect(() => {
		function runJenkins(){
			let runner = Jenkins(jenkinsConfig);

			console.log('Can i see what is runner ::: ', runner);

			runner.build.log({
				name: 'GHTest2',
				number: 1
			}, (err, data) => {
				if (err){
					console.log('Its on err!!! ::: ', err);
				} 
					
				console.log('Can i see what is the data ::: ', data);
			});
		}

		runJenkins();

	}, []);



	return (
		<Grid container direction="row" className={classes.base}>
			<Grid item xs={12} container justify="center">
				<Typography variant="h5">WILL YOU GIVE ME YOUR POWER!</Typography>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(Main);

