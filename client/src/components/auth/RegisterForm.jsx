import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

function RegisterForm(props) {
	return (
		<React.Fragment>
			<Form className="my-4">
				<Form.Group>
					<Form.Control type="text" placeholder="Username" name="username" required />
				</Form.Group>
				<Form.Group>
					<Form.Control type="password" placeholder="Password" name="confirmPassword" required />
				</Form.Group>
				<Form.Group>
					<Form.Control type="password" placeholder="Confirm password" name="password" required />
				</Form.Group>
				<Button variant="success" type="submit">Register</Button>
			</Form>
			<p>Already have an account?
				<Link to="/login">
					<Button variant="info" size="sm" className="ml-2">Login</Button>
				</Link>
			</p>
		</React.Fragment>
	)
}

RegisterForm.propTypes = {

}

export default RegisterForm

