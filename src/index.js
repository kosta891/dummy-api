import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { PostsProvider } from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <PostsProvider>
      <Router>
        <App />
      </Router>
    </PostsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
