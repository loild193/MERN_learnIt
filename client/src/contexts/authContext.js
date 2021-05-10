import { createContext, useEffect, useReducer } from "react";
import userAPI from "../api/userAPI";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	});

	// Authenticate user
	const loadUser = async () => {
		try {
			const response = await userAPI.checkUser();
			if (response.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: {
						isAuthenticated: true,
						user: response.user,
					}
				});
			}
		} catch (error) {
			localStorage.removeItem("accessToken");
			dispatch({
				type: 'SET_AUTH',
				payload: {
					isAuthenticated: false,
					user: null,
				}
			});
		}
	}

	useEffect( () => loadUser(), []);

	// login
	const loginFunction = async userForm => {
		try {
			const response = await userAPI.login(userForm);
			
			if (response.success) 
				localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
			
			await loadUser();
				
			return response;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return {
				success: false,
				message: error.message,
			};
		}
	}

	// register
	const registerFunction = async userForm => {
		try {
			const response = await userAPI.register(userForm);
			
			if (response.success) 
				localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
			
			await loadUser();
				
			return response;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return {
				success: false,
				message: error.message,
			};
		}
	}

	// logout
	const logoutFunction = async () => {
		localStorage.removeItem("accessToken");
		dispatch({
			type: "SET_AUTH",
			payload: {
				isAuthenticated: false,
				user: null,
			},
		});
	}

	// context data
	const authContextData = { loginFunction, registerFunction, logoutFunction, authState };

	// Return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{ children }
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;