import { useState } from 'react';

import MainTemplate from 'components/template/MainTemplate/MainTemplate';
import UpdateAddress from 'components/pages/UpdateAdress/UpdateAddress';

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <MainTemplate anchor="right" theme={theme} setTheme={setTheme}>
      <UpdateAddress theme={theme} />
    </MainTemplate>
  );
};

export default App;
