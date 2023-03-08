import filesCheck from '../filesCheck';
import { MAX_IMAGE_SIZE, MAX_UPLOAD_LIMIT } from '../../constants/constants';

function iterator() {
  let i = 0;
  const keys = Object.keys(this);
  return {
    next: () => {
      // The -1 is to account for our length property
      if (i >= Object.keys(this).length - 1) {
        i = 0;
        return {
          value: undefined,
          done: true,
        };
      }
      const val = {
        value: this[keys[i]],
        done: false,
      };
      i += 1;
      return val;
    },
  };
}

describe('Check is FileList correct', () => {
  test('files are correct', () => {
    const mockJpg = new File(['1234'], 'test.jpg', { type: 'image/jpeg' });
    const mockPng = new File(['1234'], 'test.png', { type: 'image/png' });

    const mockFileList = {
      0: mockJpg,
      1: mockPng,
      [Symbol.iterator]: iterator,
      length: 2,
    };

    expect(filesCheck(mockFileList)).toEqual(true);
  });

  test('error when file list larger then max limit', () => {
    const mockJpg1 = new File(['1234'], 'test.jpg', { type: 'image/jpeg' });
    const mockPng1 = new File(['1234'], 'test.png', { type: 'image/png' });
    const mockJpg2 = new File(['1234'], 'test.jpg', { type: 'image/jpeg' });
    const mockPng2 = new File(['1234'], 'test.png', { type: 'image/png' });

    const mockFileList = {
      0: mockJpg1,
      1: mockPng1,
      2: mockJpg2,
      3: mockPng2,
      [Symbol.iterator]: iterator,
      length: 4,
    };

    expect(() => {
      filesCheck(mockFileList);
    }).toThrow('Maximum 3 files per post');
  });

  test('any of file is larger then max limit', () => {
    const mockJpg1 = new File(['1234'], 'test.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(mockJpg1, 'size', { value: MAX_IMAGE_SIZE + 1 });
    const mockFileList = {
      0: mockJpg1,
      [Symbol.iterator]: iterator,
      length: 1,
    };

    expect(() => {
      filesCheck(mockFileList);
    }).toThrow('File size to big, limit 2MB');
  });
});
