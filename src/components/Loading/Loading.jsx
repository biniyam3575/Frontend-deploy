import React from 'react';
import { PropagateLoader } from 'react-spinners';
import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div className={classes.loader_container}>
      <PropagateLoader color="#f7ca00" size={15} />
    </div>
  );
};

export default Loading;