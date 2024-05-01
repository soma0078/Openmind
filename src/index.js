import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import QuestionPage from './pages/QuestionPage/QuestionPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuestionPage />
  </React.StrictMode>,
);
