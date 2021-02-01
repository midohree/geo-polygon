import React from 'react';
import PropTypes from 'prop-types';

function FloatingButton({
  children,
  onClick,
  path,
}) {
  return (
    <button onClick={() => onClick(path)}>{children}</button>
  );
}

export default FloatingButton;

FloatingButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};
