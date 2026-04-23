import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';
import { AlertProvider } from './contexts/AlertContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  </React.StrictMode>
);