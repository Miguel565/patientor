import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.tsx';

const Main = () => {
  useEffect(() => {
    // El flag se aplica a nivel global
  }, []);

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router future={{ v7_relativeSplatPath: true }}>
      <Main />
    </Router>
  </React.StrictMode>
);
