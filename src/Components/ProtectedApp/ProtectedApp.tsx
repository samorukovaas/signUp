import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoutes } from '../../lib/routes';

type PageProps = {
  text: string;
};

const Page: FC<PageProps> = ({ text }: PageProps) => {
  return <div>{text}</div>;
};

const ProtectedApp: FC = () => {
  return (
    <Switch>
      <Route exact path={PrivateRoutes.main}>
        <Page text="Main Page" />
      </Route>
      <Route path={PrivateRoutes.credit}>
        <Page text="Credit Page" />
      </Route>
      <Route path={PrivateRoutes.payments}>
        <Page text="Payments Page" />
      </Route>
      <Route path={PrivateRoutes.cards}>
        <Page text="Card Page" />
      </Route>
      <Route path={PrivateRoutes.account}>
        <Page text="Account Page" />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default ProtectedApp;
