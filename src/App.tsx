import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { GamePage } from './components/GamePage';
import { StartPage } from './components/StartPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/start" />
        </Route>
        <Route path="/start">
          <StartPage />
        </Route>
        <Route path="/play">
          <GamePage />
        </Route>
        <Route path="/gameover">
          <StartPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
