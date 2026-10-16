import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { AssetProvider, useAssets } from '../AssetContext.jsx';

function Harness() {
  const { assets, addAsset, updateAsset, deleteAsset, getAsset } = useAssets();
  return (
    <div>
      <span data-testid="count">{assets.length}</span>
      <span data-testid="status">{getAsset('C001')?.status || 'missing'}</span>
      <button onClick={() => addAsset({ id: 'C002' })}>add</button>
      <button onClick={() => updateAsset({ id: 'C001', status: 'In Use' })}>update</button>
      <button onClick={() => deleteAsset('C001')}>delete</button>
    </div>
  );
}

test('AssetContext exposes add, update, delete, and getAsset', async () => {
  const user = userEvent.setup();
  render(
    <AssetProvider startingAssets={[{ id: 'C001', status: 'Available' }]}>
      <Harness />
    </AssetProvider>
  );

  await user.click(screen.getByText('add'));
  expect(screen.getByTestId('count')).toHaveTextContent('2');

  await user.click(screen.getByText('update'));
  expect(screen.getByTestId('status')).toHaveTextContent('In Use');

  await user.click(screen.getByText('delete'));
  expect(screen.getByTestId('status')).toHaveTextContent('missing');
});
