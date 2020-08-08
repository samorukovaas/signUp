/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, ComponentClass, ReactChild } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  path: string;
  exact?: boolean;
  component?: FC | ComponentClass;
  children?: ReactChild;
  render?: (props: RouteComponentProps) => ReactChild;
};

const RenderAuthRedirect: FC<RouteComponentProps> = () => <Redirect to="/auth" />;

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuthenticated,
  component,
  path,
  children,
  render,
  ...rest
}: ProtectedRouteProps) => {
  if (component) {
    return <Route {...rest} path={path} component={isAuthenticated ? component : RenderAuthRedirect} />;
  }

  if (children) {
    return (
      <Route {...rest} path={path}>
        {isAuthenticated ? children : RenderAuthRedirect}
      </Route>
    );
  }

  if (render) {
    return <Route {...rest} path={path} render={isAuthenticated ? render : RenderAuthRedirect} />;
  }

  return null;
};

export default ProtectedRoute;
