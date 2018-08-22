/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import HomePage from '../../containers/HomePage';
import SimpleDND from '../../containers/SimpleDND';
import FormPage from '../../containers/FormPage';
import ChartsPage from '../../containers/ChartsPage';
import FillZone from '../../containers/FillZone';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={SimpleDND} />
        <Route exact path="/simple_dnd" component={SimpleDND} />
        {/*<Route exact path="/charts" component={ChartsPage} />*/}
        {/*<Route exact path="/form" component={FormPage} />*/}
        {/*<Route exact path="/fillzone" component={FillZone} />*/}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
