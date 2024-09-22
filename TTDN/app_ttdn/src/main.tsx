import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/index';
import { DataProvider } from './contexts/data/DataProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <DataProvider>
      <App />
    </DataProvider>
  </Provider>
);
