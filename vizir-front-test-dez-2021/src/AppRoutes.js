import { Routes, Route } from 'react-router-dom';

import Home from 'components/pages/Home/Home';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default AppRoutes;
