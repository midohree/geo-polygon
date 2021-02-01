import React from 'react';
import PropTypes from 'prop-types';

function FloatingButton({
  children,
}) {
  return (
    <button>{children}</button>
  );
}

export default FloatingButton;

FloatingButton.propTypes = {
  children: PropTypes.node.isRequired,
};
