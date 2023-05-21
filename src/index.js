import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UtilityState from "./context/utility/UtilityState"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UtilityState>
      <App />
    </UtilityState>
  </React.StrictMode>
);
