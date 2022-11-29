import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Componente Header', () => {
  it('É renderizado corretamente', () => {
    render(<App />);

    // Precisa trocar a página, pois na Login o componente não é renderizado.
    expect(screen.getByTestId('profile-top-btn')).toBeDefined();
    expect(screen.getByTestId('search-top-btn')).toBeDefined();
    expect(screen.getByTestId('page-title')).toBeDefined();
  });
});
