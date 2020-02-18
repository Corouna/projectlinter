import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography, Paper, Grid } from '@material-ui/core';
import { InsertDriveFile, ExpandLess, ExpandMore } from '@material-ui/icons';

const styles = theme => ({
	padLeft: {
		paddingLeft: 20
	},
	sidepad: {
		paddingLeft: 15, paddingRight: 15
	},
	rearpad: {
		paddingTop: 15, paddingBottom: 15
	},
	noboxshadow: {
		boxShadow: 'none'
	}
});

const LintingAccordion = props => {
	const { classes, key = '', data = {} } = props;
	const { id = '', file = '', open = false, handler = () => {}, error = [] } = data;

	return (
		<Fragment key={key}>
			<ListItem button onClick={() => handler(id)}>
        <ListItemIcon>
          <InsertDriveFile />
        </ListItemIcon>
        <ListItemText primary={file} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
        <Paper className={`${classes.sidepad} ${classes.rearpad} ${classes.noboxshadow} `}>
        	{
        		error.map(({ line, column, description, type }, idx) => (
        			<Grid key={idx} container>
        				<Grid item xs={2}>
        					<Typography variant="caption">
		        				Line {line}: Col {column}
		        			</Typography>
        				</Grid>
        				<Grid item xs={6} className={classes.padLeft}>
        					<Typography variant="caption">
		        				{description}
		        			</Typography>
        				</Grid>
        				<Grid item xs={3} className={classes.padLeft}>
        					<Typography variant="caption">
		        				{type}
		        			</Typography>
        				</Grid>
        			</Grid>
        		))
        	}
        </Paper>
      </Collapse>
    </Fragment>
	)

};

export default withStyles(styles)(LintingAccordion);