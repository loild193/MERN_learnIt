import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

function Login(props) {
	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
	});
	const { username, password } = loginForm;
	const { loginFunction } = useContext(AuthContext);
	const history = useHistory();

	const onChangeLoginForm = (event) => 
		setLoginForm({
			...loginForm, 
			[event.target.name]: event.target.value,
		});

	const login = async event => {
		event.preventDefault();

		try {
			const loginData = await loginFunction(loginForm);
			if (loginData.success)
				history.push('/dashboard');
		} catch (error) {
			console.log(error);
		}		
	}

	return (
		<React.Fragment>
			<Form className="my-4" onSubmit={login}>
				<Form.Group>
					<Form.Control 
						type="text" 
						placeholder="Username" 
						name="username"
						value={username}
						onChange={onChangeLoginForm}
						required 
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control 
						type="password" 
						placeholder="Password" 
						name="password"
						value={password}
						onChange={onChangeLoginForm}
						required 
					/>
				</Form.Group>
				<Button variant="success" type="submit">Login</Button>
			</Form>
			<p>Don't have an account?
				<Link to="/register">
					<Button variant="info" size="sm" className="ml-2">Register</Button>
				</Link>
			</p>
		</React.Fragment>
	)
}

Login.propTypes = {

}

export default Login

