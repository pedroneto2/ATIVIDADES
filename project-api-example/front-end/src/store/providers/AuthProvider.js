/* eslint-disable react/jsx-no-constructed-context-values */
import AuthContext from 'store/contexts/AuthContext';
import useAuth from './hooks/useAuth';

const AuthProvider = ({ children }) => {
  const { authorization, loading, handleLogin, handleLogout } = useAuth();
  return (
    <AuthContext.Provider value={{ authorization, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
