import React from 'react';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router';
import { useFormValidation } from './hooks/useFormValidation';

test('renderiza el formulario de Home', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/Nro. de documento/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Celular/i)).toBeInTheDocument();
  expect(screen.getByText(/Cotiza aquí/i)).toBeInTheDocument();
});

test('valida correctamente un DNI y teléfono válido', () => {
  const { result } = renderHook(() => useFormValidation());
  act(() => {
    const isValid = result.current.validate({ 'document-number': '12345678', phone: '987654321' }, 'dni');
    expect(isValid).toBe(true);
  });
});