import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css'; // Import default styles
import App from './App';
import './i18n';
import { AuthProvider } from './context/AuthContext';
import store from './redux/store';
import { Provider } from 'react-redux';
import { OrderProvider } from './context/OrderContext';
import { ModalProvider } from './context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <OrderProvider>
        <BrowserRouter>
          <StrictMode>
            <ModalProvider>
              <App />
            </ModalProvider>
          </StrictMode>
        </BrowserRouter>
      </OrderProvider>
    </AuthProvider>
  </Provider>
);
