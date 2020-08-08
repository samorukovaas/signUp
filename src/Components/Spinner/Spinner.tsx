import React, { FC, CSSProperties } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';
import classes from './Spinner.module.scss';

type SpinnerProps = {
  style?: CSSProperties;
  minHeight?: string;
  text?: string;
  className?: string;
};

const Spinner: FC<SpinnerProps> = ({ style, minHeight, text, className }: SpinnerProps) => (
  <div style={{ ...style, minHeight }} className={classnames(classes.container, className)}>
    <CircularProgress />
    {text && <p style={{ margin: '15px' }}>{text}</p>}
  </div>
);

export default Spinner;
