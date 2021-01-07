import React from 'react';
import { render,screen } from '@testing-library/react';
import App from '../App';
import Home from '../components/Home';

// original test for reference
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// was failing using App component since it didn't drill down

test('renders learn react link', () => {
  const { getByText } = render(<Home />);
  const headerElement = screen.getByText(/Welcome to Patient check-in/i);
  expect(headerElement).toBeInTheDocument();
});
