import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import DashboardLayout from '../pages/_layouts/dashboard';
import ErrorPage from '../pages/Error'

import { store } from '../store';


export default function PrivateRoutePOD({
	component: Component,
	path,
	...rest
}) {
	const { signed } = store.getState().auth;
	let Layout = null;

	if (signed) {
		Layout = DashboardLayout;
		return (
			<Route
				{...rest}
				render={(props) =>
					store.getState().auth &&
					store.getState().user.profile.tus_descricao === 'Podcaster' &&
					path.includes('/podcaster') ? (
						<Layout>
							<Component {...props} />
						</Layout>
					) : (
						<ErrorPage/>
					)
				}
			/>
		);
	} else {
		return <Redirect to="/Login" />;
	}
}


PrivateRoutePOD.prototype = {
	component: PropTypes.func.isRequired
};

