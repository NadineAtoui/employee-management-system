import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeInAnimation.css';

const FadeInAnimation = ({ show }) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="fade-in"
      unmountOnExit
    >
      <div className="fade-in-element">Content to animate</div>
    </CSSTransition>
  );
};

export default FadeInAnimation;
