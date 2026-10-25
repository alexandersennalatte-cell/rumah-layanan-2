import {createRoot} from 'react-dom/client';
import '@idds/react/index.css';
import { ToastProvider, ConfirmationProvider } from '@idds/react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ConfirmationProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ConfirmationProvider>
);
