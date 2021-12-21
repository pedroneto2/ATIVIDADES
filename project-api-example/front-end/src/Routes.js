/* eslint-disable react/jsx-fragments */

import { Routes, Route } from 'react-router-dom';

import LoginPage from 'components/pages/LoginPage/LoginPage';
import Projects from 'components/pages/Projects/Projects';
import Register from 'components/pages/Register/Register';
import Tasks from 'components/pages/Tasks/Tasks';
import Create from 'components/pages/Create/Create';

import CustomPage from 'components/utils/CustomPage/CustomPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomPage Page={LoginPage} />} />
      <Route path="/register" element={<CustomPage Page={Register} />} />
      <Route path="/my-projects" element={<CustomPage Page={Projects} isPrivate />} />
      <Route path="/create-new-project" element={<Create />} />
      <Route path="/my-projects/:id" element={<Tasks />} />
      <Route path="/my-projects/:id/create-task" element={<Create />} />
    </Routes>
  );
}

export default App;
