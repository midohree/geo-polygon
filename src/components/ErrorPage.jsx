import React from 'react';

import PropTypes from 'prop-types';

function ErrorPage({children}) {
  return <h3>{children}</h3>;
}

export default ErrorPage;

ErrorPage.propTypes = {
  children: PropTypes.node.isRequired,
};
