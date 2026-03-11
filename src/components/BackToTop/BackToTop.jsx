import React from 'react';
import classes from './BackToTop.module.css';

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className={classes.back_to_top} onClick={scrollToTop}>
      Back to top
    </button>
  );
};

export default BackToTop;