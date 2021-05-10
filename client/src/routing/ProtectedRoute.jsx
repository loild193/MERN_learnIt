import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../contexts/authContext'
import Spinner from 'react-bootstrap/esm/Spinner';
import { Redirect, Route } from 'react-router';
import NavbarMenu from '../components/layout/NavbarMenu';

function ProtectedRoute({ component: Component, ...rest }) {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);

	if (authLoading) 
		return (
			<div className="spinner-container">
				<Spinner animation="border" variant="info" />
			</div>
		)

	return (
		<Route {...rest} render={props => isAuthenticated 
			? 
			(<React.Fragment>
				<NavbarMenu />
				<Component {...rest} {...props} />
			</React.Fragment>) 
			: 
			<Redirect to="/login" />} 
		/>
	)
}

ProtectedRoute.propTypes = {

}

export default ProtectedRoute

