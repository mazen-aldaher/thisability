import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    return result;
  };

  const logout = async (credentials) => {
    const result = await dispatch(logoutUser(credentials));
    return result;
  };

  return { login, loading, error, logout };
};

export default useAuth;
