import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography, Paper, Grid } from '@material-ui/core';
import { Check, Close, ExpandLess, ExpandMore } from '@material-ui/icons';

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

const UnitTestAccordion = props => {
	const { classes, key = '', data = {} } = props;
	const { id = '', file = '', open = false, handler = () => {}, result = [] } = data;

	return (
		<Fragment key={key}>
			<ListItem button onClick={() => handler(id)}>
        <ListItemIcon>
          {Boolean(file.includes('PASS ')) ? <Check style={{color: 'green'}} /> : <Close style={{color: 'red'}} />}
        </ListItemIcon>
        <ListItemText primary={file.replace('PASS ', '')} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
        <Paper className={`${classes.sidepad} ${classes.rearpad} ${classes.noboxshadow} `}>
        	{
        		result.map((res, idx) => (
        			<Grid key={idx} container>
        				<Grid item xs={12} container>
        					<Grid item xs={6} container justify="flex-start">
	        					{
	        						Boolean(res.includes('✓ ')) ? 
	        						<Typography variant="caption" style={{color: 'green', marginRight: 20, fontWeight: 800}}>PASS</Typography> : 
	        						<Typography variant="caption" style={{color: 'red', marginRight: 20, fontWeight: 800}}>FAIL</Typography>
	        					}
	        					<Typography variant="caption">
			        				{res.replace('✓ ', '')}
			        			</Typography>
        					</Grid>
        					<Grid item xs={6} container justify="flex-end">
        					</Grid>
        				</Grid>
        			</Grid>
        		))
        	}
        </Paper>
      </Collapse>
    </Fragment>
	)
};

export default withStyles(styles)(UnitTestAccordion);