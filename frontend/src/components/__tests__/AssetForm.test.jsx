import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import AssetForm from '../AssetForm.jsx';

describe('AssetForm connected to Spring', () => {
  test('shows validation when required fields are missing', async () => {
    const user = userEvent.setup();
    render(<AssetForm onSave={vi.fn()} onCancel={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /add asset/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/required fields/i);
  });
  test('submits a complete asset without assigning an ID', async () => {
    const user = userEvent.setup(); const onSave = vi.fn().mockResolvedValue(undefined);
    render(<AssetForm onSave={onSave} onCancel={vi.fn()} />);
    await user.type(screen.getByLabelText(/computer name/i), 'MacBook Air');
    await user.type(screen.getByLabelText(/^brand/i), 'Apple');
    await user.type(screen.getByLabelText(/^model/i), 'M3');
    await user.type(screen.getByLabelText(/purchase date/i), '2026-02-02');
    await user.click(screen.getByRole('button', { name: /add asset/i }));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'MacBook Air' }));
  });
});
