import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

/* Pages */
import { Main } from './pages';

const Routes = props => {
	const location = useLocation();

	return (
		<Switch location={location}>
			<Route path="/" render={ props => <Main /> } />
		</Switch>
	);
}

export default Routes;