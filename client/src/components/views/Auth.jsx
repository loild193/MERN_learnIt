import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'
import { AuthContext } from '../../contexts/authContext'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect } from 'react-router'

function Auth({ authRoute }) {
	const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);

	let body;

	if (authLoading)
		body = (
			<div className="d-flex justify-content-center mt-2">
				<Spinner animation="border" variant="info" />
			</div>
		)
		else if (isAuthenticated) 
			return <Redirect to="/dashboard" />
		else 
			body = (
				<React.Fragment>
					{
						authRoute === "login" ? 
						<LoginForm />
						:
						<RegisterForm />
					}
				</React.Fragment>
			);

	return (
		<div className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1>LearnIt</h1>
					<h4>Keep track of what you are learning</h4>
					{ body }
				</div>
			</div>
		</div> 
	)
}

Auth.propTypes = {

}

export default Auth

