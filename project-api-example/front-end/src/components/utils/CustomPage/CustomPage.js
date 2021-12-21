/* eslint-disable react/jsx-props-no-spreading */
const { default: LoadingPage } = require('components/pages/LoadingPage/LoadingPage');
const { useContext } = require('react');
const { Navigate } = require('react-router-dom');
const { default: AuthContext } = require('store/contexts/AuthContext');

const CustomPage = ({ Page, isPrivate, ...restProps }) => {
  const { authorization, loading } = useContext(AuthContext);

  if (loading) return <LoadingPage />;

  if (isPrivate && !authorization) return <Navigate replace to="/" />;

  if (authorization && Page.name === 'LoginPage') return <Navigate to="/my-projects" />;

  return <Page {...restProps} />;
};

export default CustomPage;
