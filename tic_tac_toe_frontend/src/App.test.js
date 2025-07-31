import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders tic tac toe board and can make a move', () => {
  render(<App />);
  // There should be 9 cells
  const cells = screen.getAllByRole('button', { name: /cell/i });
  expect(cells.length).toBe(9);

  // Make a move on empty cell
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent(/x|o/i);
});

test('restart button clears board', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell/i });
  // Make a move
  fireEvent.click(cells[0]);
  expect(cells[0].textContent).toMatch(/x|o/i);
  // Click restart
  const restartBtn = screen.getByRole('button', { name: /restart/i });
  fireEvent.click(restartBtn);
  // Cells should be empty again
  expect(cells[0].textContent).toBe('');
});
