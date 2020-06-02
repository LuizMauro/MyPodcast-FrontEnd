import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { store } from '../store';

export default function PrivateRoute({ component: Component, path, ...rest }) {
	const { signed } = store.getState().auth;

	if (signed) {
		return (
			<Route
				{...rest}
				render={(props) =>
					store.getState().auth ? (
						<Component {...props} />
					) : (
						<h1>Área restrita </h1>
					)
				}
			/>
		);
	} else {
		return <Redirect to="/Login" />;
	}
}

PrivateRoute.prototype = {
	component: PropTypes.func.isRequired
};
