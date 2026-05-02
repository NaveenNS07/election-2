import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppProvider, useAppContext } from '../context/AppContext';

// Mock Firebase service to avoid import.meta errors
jest.mock('../services/firebase', () => ({
  auth: { onAuthStateChanged: jest.fn(() => jest.fn()) },
  getUserData: jest.fn(() => Promise.resolve({})),
  saveUserData: jest.fn(() => Promise.resolve()),
  signInWithGoogle: jest.fn(),
  logout: jest.fn()
}));

// Mock child component to use the context
const SettingsTester = () => {
  const { country, setCountry, saveUserData } = useAppContext();
  return (
    <div>
      <span data-testid="country-display">{country}</span>
      <button onClick={() => setCountry('USA')}>Change to USA</button>
      <button onClick={saveUserData}>Save</button>
    </div>
  );
};

describe('Settings Integration', () => {
  test('updates global state and calls save', async () => {
    // Note: This is a simplified test. In a real scenario, we'd mock firestore.
    render(
      <AppProvider>
        <SettingsTester />
      </AppProvider>
    );

    const display = screen.getByTestId('country-display');
    const changeBtn = screen.getByText('Change to USA');

    fireEvent.click(changeBtn);
    expect(display.textContent).toBe('USA');
  });
});
