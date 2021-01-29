import React from 'react'
import PropTypes from 'prop-types';

function Button({
  children,
}) {
  return (
    <button>{children}</button>
  )
}

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
