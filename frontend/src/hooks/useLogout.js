import { useAuthContext } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
	const { logoutUser } = useAuthContext();
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('user');
		logoutUser();
		navigate('/');
	};

	return { logout };
};

export default useLogout;
