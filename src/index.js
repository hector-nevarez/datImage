// /*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// chrome.storage.local.get(null, function (data) {
ReactDOM.render(
  <App /* {...data} */ />,
  document.getElementById('root')
)
// });
