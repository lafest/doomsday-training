import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { GameOverPage } from './components/GameOverPage';
import { GamePage } from './components/GamePage';
import { StartPage } from './components/StartPage';
import { routeNames } from './constant';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routeNames.start}>
          <StartPage />
        </Route>
        <Route path={routeNames.play}>
          <GamePage />
        </Route>
        <Route path={routeNames.gameOver}>
          <GameOverPage />
        </Route>
        <Route path="*">
          <Redirect to={routeNames.start} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
