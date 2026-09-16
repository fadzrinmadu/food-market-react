import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/tailwind.css'
import 'leaflet/dist/leaflet.css'

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.unregister();
