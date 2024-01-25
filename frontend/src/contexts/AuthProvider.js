import { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				user: action.payload,
			};
		case 'LOGOUT_USER':
			return { user: null };
		default:
			return state;
	}
}

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		if (user) {
			loginUser(user);
		}
	}, []);

	function loginUser(user) {
		dispatch({
			type: 'LOGIN_USER',
			payload: user,
		});
	}

	function logoutUser() {
		dispatch({ type: 'LOGOUT_USER' });
	}

	return (
		<AuthContext.Provider value={{ ...state, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
