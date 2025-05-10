import { renderHook, waitFor } from '@testing-library/react';
import { useUser } from './useUser';
import * as userService from '../services/userService';

describe('useUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devuelve el usuario correctamente', async () => {
    const mockUser = { name: 'Juan', lastName: 'Pérez', birthDay: '01-01-1990' };
    jest.spyOn(userService, 'fetchUser').mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useUser());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('devuelve error si fetchUser falla', async () => {
    jest.spyOn(userService, 'fetchUser').mockRejectedValueOnce(new Error('Error de red'));

    const { result } = renderHook(() => useUser());
await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Error de red');
  });
});