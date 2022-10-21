import {
  render,
  screen,
} from '../../../../test-utils/testing-library-userPostContext';
import userEvent from '@testing-library/user-event';
import FileUploadForm from '../FileUploadForm';

import { useUserPostContext } from '../../../../hooks/useUserPostContext';

jest.mock('../../../../hooks/useUserPostContext');

describe('FileUploadForm component', () => {
  test('upload on click', async () => {
    let files;
    useUserPostContext.mockImplementation(() => ({
      currentStage: 'choose-files',
      setFiles: jest.fn(file => (files = file)),
    }));

    render(<FileUploadForm />);
    const file = new File(['hello'], 'hello.png', {
      type: 'image/png',
    });
    const user = userEvent.setup();
    const input = screen.getByTestId('file-input');
    expect(files).toBe(undefined);
    await user.upload(input, file);
    expect(files.length).toBe(1);
  });
});
