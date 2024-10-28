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
import { NotificationProvider } from './context/NotificationContext';
import { UsersProvider } from './context/UsersContext';
import { ButtonLoadingProvider } from './context/ButtonLoadingContext';
import { LoadingProvider } from './context/LoadingContext';
import { SelectedUserProvider } from './context/SelectedUserContext';
import { ConfirmDialogProvider } from './context/ConfirmDialogContext';
import { EditModeProvider } from './context/EditeModeContext';
import { ErrorsProvider } from './context/ErrorsContext';
import { NewUserProvider } from './context/NewUserContext';
import { SearchQueryProvider } from './context/SearchQueryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
              <ErrorsProvider>
    <NotificationProvider>
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <StrictMode>
                <ModalProvider>
                  <SelectedUserProvider>
                    <UsersProvider>
                      <ButtonLoadingProvider>
                        <ConfirmDialogProvider>
                          <EditModeProvider>
                            <NewUserProvider>
                              <SearchQueryProvider>
                                <OrderProvider>
                                  <App />
                                </OrderProvider>
                              </SearchQueryProvider>
                            </NewUserProvider>
                          </EditModeProvider>
                        </ConfirmDialogProvider>
                      </ButtonLoadingProvider>
                    </UsersProvider>
                  </SelectedUserProvider>
                </ModalProvider>
            </StrictMode>
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    </NotificationProvider>
              </ErrorsProvider>
  </Provider>
);
