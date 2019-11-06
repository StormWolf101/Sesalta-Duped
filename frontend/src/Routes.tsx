import React from "react";
import { Switch, Route } from "react-router-dom";
import GamePlayPage from "./pages/GamePlayPage";
import GamePlayPageMap from "./pages/GamePlayPageMap";
import GameModePage from "./pages/GameModePage";
import GameOptionsPage from "./pages/GameOptionsPage";
import GamePlayPageCapital from "./pages/GamePlayPageCapital";
import AppliedRoute from "./components/AppliedRoute";


interface RouteProps {
  appProps: any;
}

const Routes: React.FC<RouteProps> = ({ appProps }) => (
  <Switch>
    <AppliedRoute
      path="/game/play"
      exact
      component={GamePlayPage}
      props={appProps}
    />
    <AppliedRoute
      path="/game/play/map"
      exact
      component={GamePlayPageMap}
      props={appProps}
    />
    <AppliedRoute
      path="/game/play/capital/:id"
      exact
      component={GamePlayPageCapital}
      props={appProps}
    />
    <AppliedRoute
      path="/game/options"
      exact
      component={GameOptionsPage}
      props={appProps}
    />
    <AppliedRoute
      path="/game"
      exact
      component={GameModePage}
      props={appProps}
    />
    {/*  catch all unmatched routes */}
    <Route component={GameModePage} />
  </Switch>
);

export default Routes;
