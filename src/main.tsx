import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { UserProvider } from './Context/UserContext';
import { CreateAppProvider } from './Context/CreateApp';
import { ValidatorsProvider } from './Context/ValidatorsContext';
import { DashboardProvider } from './Context/DashboardContext';
import { AssociateValidatorProvider } from './Context/AssociateValidatorContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <DashboardProvider>
          <CreateAppProvider>
            <ValidatorsProvider>
              <AssociateValidatorProvider>
                <App />
              </AssociateValidatorProvider>
            </ValidatorsProvider>
          </CreateAppProvider>
        </DashboardProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
);
