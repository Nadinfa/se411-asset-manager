import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import AssetForm from '../AssetForm.jsx';

const assets = [
  { id: 'C001', name: 'Laptop', brand: 'Dell', model: 'X1', status: 'Available', assignedTo: '', purchaseDate: '2026-01-01' }
];

describe('AssetForm', () => {
  test('shows validation when required fields are missing', async () => {
    const user = userEvent.setup();
    render(<AssetForm assets={assets} onSave={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /add asset/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/complete all required fields/i);
  });

  test('rejects a duplicate asset ID', async () => {
    const user = userEvent.setup();
    render(<AssetForm assets={assets} onSave={vi.fn()} />);

    await user.type(screen.getByLabelText(/asset id/i), 'C001');
    await user.type(screen.getByLabelText(/computer name/i), 'New Laptop');
    await user.type(screen.getByLabelText(/^brand/i), 'HP');
    await user.type(screen.getByLabelText(/^model/i), 'EliteBook');
    await user.type(screen.getByLabelText(/purchase date/i), '2026-02-01');
    await user.click(screen.getByRole('button', { name: /add asset/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/unique/i);
  });

  test('submits a complete valid asset', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<AssetForm assets={assets} onSave={onSave} />);

    await user.type(screen.getByLabelText(/asset id/i), 'c002');
    await user.type(screen.getByLabelText(/computer name/i), 'MacBook Air');
    await user.type(screen.getByLabelText(/^brand/i), 'Apple');
    await user.type(screen.getByLabelText(/^model/i), 'M3');
    await user.type(screen.getByLabelText(/purchase date/i), '2026-02-02');
    await user.click(screen.getByRole('button', { name: /add asset/i }));

    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ id: 'C002', name: 'MacBook Air' }));
  });
});
