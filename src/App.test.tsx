import { MemoryRouter } from 'react-router-dom';

import { App, WrappedApp } from './App';
import { render } from './utils/test/test-utils';

describe('App', () => {
  it('Renders hello world', () => {
    // ARRANGE
    const { getByRole } = render(<WrappedApp />);
    // ACT
    // EXPECT
    expect(
      getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World');
  });

  it('Renders not found if invalid path', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    expect(
      getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found');
  });
});
