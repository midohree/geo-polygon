import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import '@testing-library/jest-dom';

import { App, LocationDisplay } from './App';

test('full app rendering/navigating', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );

  expect(screen.getByText(/Geo Polygon/i)).toBeInTheDocument();

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/START/i), leftClick);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});


