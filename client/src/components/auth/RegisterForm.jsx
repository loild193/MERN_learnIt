import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../layout/AlertMessage'

function RegisterForm(props) {
	const [registerForm, setRegisterForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const { username, password, confirmPassword } = registerForm;
	const [alert, setAlert] = useState(null);
	const { registerFunction } = useContext(AuthContext);

	const onChangeRegisterForm = (event) => 
		setRegisterForm({
			...registerForm, 
			[event.target.name]: event.target.value,
		});

	const register = async event => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setAlert({
				type: "danger",
				message: "Password does not match",
			});
			setTimeout(() => setAlert(null), 2000);

			return;
		}

		try {
			const registerData =	await registerFunction(registerForm);
			if (!registerData.success) {
				setAlert({
					type: 'danger',
					message: registerData.message,
				});
				setTimeout(() => setAlert(null), 2000);
			}
		} catch (error) {
			console.log(error);
		}		
	}

	return (
		<React.Fragment>
			<Form className="my-4" onSubmit={register}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control 
						type="text" 
						placeholder="Username" 
						name="username" 
						required
						value={username}
						onChange={onChangeRegisterForm} 
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control 
						type="password" 
						placeholder="Password" 
						name="password" 
						required
						value={password}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control 
						type="password"
						placeholder="Confirm password" 
						name="confirmPassword" 
						required
						value={confirmPassword}
						onChange={onChangeRegisterForm} 
					/>
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

