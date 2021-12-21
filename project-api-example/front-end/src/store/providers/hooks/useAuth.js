import { login, validateToken } from 'api/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [authorization, setAuthorization] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    const { token } = await login(formData);
    const user = await validateToken(token);
    localStorage.setItem('token', token);
    setAuthorization(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthorization(undefined);
    navigate('/');
  };

  useEffect(async () => {
    const token = localStorage.getItem('token');
    let user;
    try {
      user = await validateToken(token);
    } catch (error) {
      localStorage.removeItem('token');
    }
    setAuthorization(user);
    setLoading(false);
  }, []);

  return { authorization, loading, handleLogin, handleLogout };
};

export default useAuth;
