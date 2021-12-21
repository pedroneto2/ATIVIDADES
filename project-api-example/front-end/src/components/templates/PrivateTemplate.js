import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from 'store/contexts/AuthContext';
import './PrivateTemplate.css';

const PrivateTemplate = ({ children, projectID }) => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div className="private-page-container">
      <div className="private-navigation-container">
        <Link to="/">Iron Projects</Link>
        <div className="private-links-container">
          <Link to="/my-projects">My Projects</Link>
          <div className="create-container">
            <Link to="/create-new-project">Create new Project</Link>
            {projectID && <Link to={`/my-projects/${projectID}/create-task`}>Create new Task</Link>}
          </div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="private-content-container">{children}</div>
    </div>
  );
};

export default PrivateTemplate;
