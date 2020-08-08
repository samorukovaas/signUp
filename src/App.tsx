import React, { FC } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.module.scss";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedApp from "./Components/ProtectedApp/ProtectedApp";
import Layout from "./Layout";
import Auth from "./Components/Auth";
import { isLoggedSelector } from "./redux/selectors";
import { PublicRoutes } from "./lib/routes";

const App: FC = () => {
  const isLoggedIn = useSelector(isLoggedSelector);

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path={PublicRoutes.auth}>
              <Auth />
            </Route>
            <ProtectedRoute isAuthenticated={isLoggedIn} path="/">
              <ProtectedApp />
            </ProtectedRoute>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
