import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import Assets from '../Assets.jsx';
import { AssetProvider } from '../../context/AssetContext.jsx';

const assets = [
  { id: 'C001', name: 'Latitude', brand: 'Dell', model: '5540', status: 'Available', assignedTo: '', purchaseDate: '2026-01-01' },
  { id: 'C002', name: 'MacBook Pro', brand: 'Apple', model: 'M3', status: 'In Use', assignedTo: 'Sara', purchaseDate: '2026-02-01' }
];

function renderAssets() {
  return render(
    <MemoryRouter>
      <AssetProvider startingAssets={assets}>
        <Assets />
      </AssetProvider>
    </MemoryRouter>
  );
}

describe('Assets list', () => {
  test('displays asset records', () => {
    renderAssets();
    expect(screen.getByText('C001')).toBeInTheDocument();
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
  });

  test('filters assets using search', async () => {
    const user = userEvent.setup();
    renderAssets();

    await user.type(screen.getByLabelText(/search assets/i), 'Apple');

    expect(screen.getByText('C002')).toBeInTheDocument();
    expect(screen.queryByText('C001')).not.toBeInTheDocument();
  });

  test('deletes an asset after confirmation', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderAssets();

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    expect(screen.queryByText('C001')).not.toBeInTheDocument();
    window.confirm.mockRestore();
  });
});
