import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const appTitleElement = screen.getByText(/MONEYMAN APPS/i);
  expect(appTitleElement).toBeInTheDocument();
});

