import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  const user = userEvent.setup();
  return { ...render(ui, { ...options }), user };
};

export * from '@testing-library/react';
export { customRender as render };
