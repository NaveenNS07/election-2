import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const TestApp = () => (
  <MemoryRouter initialEntries={['/']}>
    <Routes>
      <Route path="/" element={<button onClick={() => window.location.assign('/journey')}>Go</button>} />
      <Route path="/journey" element={<div>Journey Page</div>} />
    </Routes>
  </MemoryRouter>
);

describe('Navigation', () => {
  test('renders main content correctly', () => {
    render(<TestApp />);
    expect(screen.getByText('Go')).toBeInTheDocument();
  });
});
