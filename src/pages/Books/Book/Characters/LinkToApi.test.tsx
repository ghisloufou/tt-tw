import { customRender } from '../../../../utils/test/test-utils';
import { LinkToApi } from './LinkToApi';

const url = 'https://anapioficeandfire.com/api/characters/12';

describe('LinkToApi component', () => {
  it('should render a button with a truncated url and open a new tab on click', async () => {
    const windowSpy = vi.spyOn(window, 'open');

    const { findByRole, findByText, user } = customRender(
      <LinkToApi url={url} />
    );

    const button = await findByRole('button');
    const truncatedText = await findByText('characters/12');

    expect(button).toBeInTheDocument();
    expect(truncatedText).toBeInTheDocument();

    await user.click(button);

    expect(windowSpy).toHaveBeenCalledTimes(1);
    expect(windowSpy).toHaveBeenNthCalledWith(1, url, '_blank');
  });
});
