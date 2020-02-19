import React, { Fragment, useState } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography, Paper, Grid, Tooltip, Popover } from '@material-ui/core';
import { Check, Close, ExpandLess, ExpandMore, Error } from '@material-ui/icons';

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
	},
	errpaper: {
		width: 350,
		minHeight: 200,
		height: 'auto',
		padding: 20
	}
});

const UnitTestAccordion = props => {
	const { classes, key = '', data = {} } = props;
	const { id = '', file = '', open = false, handler = () => {}, result = [] } = data;
	const [elm, setElm] = useState(null);
	const [content, setContent] = useState([]);
	const popping = Boolean(elm);

	const openPopover = (evt, msg) => {
		setContent( Boolean( !_.isEmpty(_.find(result, ['message', msg])) ) && _.find(result, ['message', msg]).error);
		setElm(evt.currentTarget);
	}

	const closePopover = evt => {
		setContent([]);
		setElm(null);
	}

	return (
		<Fragment key={key}>
			<ListItem button onClick={() => handler(id)}>
        <ListItemIcon>
          {Boolean(file.includes('PASS ')) ? <Check style={{color: 'green'}} /> : <Close style={{color: 'red'}} />}
        </ListItemIcon>
        <ListItemText primary={file.replace('PASS ', '').replace('FAIL ', '')} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
        <Paper className={`${classes.sidepad} ${classes.rearpad} ${classes.noboxshadow} `}>
        	{
        		result.map((res, idx) => (
        			<Grid key={idx} container>
        				<Grid item xs={12} container>
        					<Grid item xs={6} container justify="flex-start" style={{ padding: '3px 0' }}>
	        					{
	        						Boolean(res.message.includes('✓ ')) ? 
	        						<Typography variant="caption" style={{color: 'green', marginRight: 20, fontWeight: 800}}>PASS</Typography> : 
	        						<Typography variant="caption" style={{color: 'red', marginRight: 20, fontWeight: 800}}>FAIL</Typography>
	        					}
	        					<Typography variant="caption">
			        				{res.message.replace('✓ ', '').replace('✕ ', '')}
			        			</Typography>
        					</Grid>
        					<Grid item xs={6} container justify="flex-end">
        						{
        							res.message.includes('✕ ') &&
        							<Tooltip title="Click here to see the error">
        								<Error onClick={evt => openPopover(evt, res.message)} style={{ color: 'red' }} />
        							</Tooltip>
        						}
        					</Grid>
        				</Grid>
        			</Grid>
        		))
        	}
        </Paper>
      </Collapse>
      <Popover 
				open={popping}
				anchorEl={elm}
				onClose={closePopover}
			  anchorOrigin={{
			    vertical: 'bottom',
			    horizontal: 'left',
			  }}
			  transformOrigin={{
			    vertical: 'top',
			    horizontal: 'left',
			  }}
			>
			  <Paper className={classes.errpaper}>
			  	{
			  		Boolean(content.length) && 
			  		<Grid container>
			  			{
			  				content.map( (v, idx) => {
			  					switch(true){
			  						case v.includes('● '):
				  						return (
				  							<Fragment key={idx}>
					  							<Grid item xs={12}>
					  								<Typography variant="subtitle1" style={{ fontWeight: 600 }}>{v.replace('● ', '')}</Typography>
					  							</Grid>
					  							<Grid item xs={12}><div style={{ height: 15 }} /></Grid>
				  							</Fragment>
				  						);
				  					break;
				  							
			  						case v.includes('at Object.<anonymous>'):
			  							return (
			  								<Fragment key={idx}>
				  								<Grid item xs={12}><div style={{ height: 15 }} /></Grid>
				  								<Grid item xs={12}>
				  									<Typography variant="subtitle2" style={{ fontStyle: 'italic', fontSize: 12 }}>{v}</Typography>
				  								</Grid>
			  								</Fragment>
			  							);
			  						break;

			  						default:
			  							return (
			  								<Grid key={idx} item xs={12} style={{ backgroundColor:'#D5D5D5' }}>
			  									<Typography variant="caption" style={{ paddingLeft: 15, fontSize: 11 }}>{v}</Typography>
			  								</Grid>
			  							);
			  					}
			  				})
			  			}
			  		</Grid>
			  	}
			  </Paper>
			</Popover>
    </Fragment>
	)
};

export default withStyles(styles)(UnitTestAccordion);