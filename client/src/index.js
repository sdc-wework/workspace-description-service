import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import WorkspaceDescription from './components/workspace-description';
import WorkspaceHeader from './components/workspace-header';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/buildings/1" />
      </Route>
      <Route path="/buildings/:workspaceId">
        <WorkspaceHeader />
        <WorkspaceDescription />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('workspace-description'),
);
