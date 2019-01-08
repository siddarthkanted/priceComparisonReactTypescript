import { createBrowserHistory } from "history";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Router } from "react-router";
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router history={createBrowserHistory({})}>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

