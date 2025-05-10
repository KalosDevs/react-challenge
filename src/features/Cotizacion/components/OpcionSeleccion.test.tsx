import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OpcionSeleccion from './OpcionSeleccion';

describe('OpcionSeleccion', () => {
  it('muestra el título y el subtítulo', () => {
    render(
      <OpcionSeleccion
        selected={false}
        onClick={() => {}}
        iconClass="icon"
        title="Para mí"
        subtitle="Cotiza tu seguro de salud"
      />
    );
    expect(screen.getByText('Para mí')).toBeInTheDocument();
    expect(screen.getByText('Cotiza tu seguro de salud')).toBeInTheDocument();
  });

  it('llama a onClick cuando se hace click', () => {
    const handleClick = jest.fn();
    render(
      <OpcionSeleccion
        selected={false}
        onClick={handleClick}
        iconClass="icon"
        title="Para mí"
        subtitle="Cotiza tu seguro de salud"
      />
    );
    fireEvent.click(screen.getByTestId('opcion-seleccion-check'));
expect(handleClick).toHaveBeenCalled();
  });
});