import React from 'react';
import PropTypes from 'prop-types';

function Button({
  children,
  handleClick
}) {
  return (
    <button onClick={() => handleClick()}>{children}</button>
  )
}

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
};
