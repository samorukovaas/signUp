import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';
import classes from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className={classes.Container}>
      <Paper elevation={2} className={classes.paper}>
        {children}
      </Paper>
      <div className={classes.background} />
    </div>
  );
};

export default Layout;
