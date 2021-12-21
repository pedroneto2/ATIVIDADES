import './App.css';

import OrderLists from 'components/OrderLists';
import IsInterlaced from 'components/IsInterlaced';

export default function App() {
  return (
    <div className="app-container">
      <div className="ordena-lista-container my-5">
        <OrderLists />
      </div>
      <hr />
      <div className="is-interlaced-container my-5">
        <IsInterlaced />
      </div>
    </div>
  );
}
