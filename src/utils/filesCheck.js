import { MAX_IMAGE_SIZE, MAX_UPLOAD_LIMIT } from '../constants/constants';

const filesCheck = fileList => {
  // number of files
  if (fileList.length > MAX_UPLOAD_LIMIT)
    throw new Error('Maximum 3 files per post');
  // file size
  [...fileList].forEach(file => {
    console.log(file);
    if (file.size > MAX_IMAGE_SIZE)
      throw new Error('File size to big, limit 5MB');
  });
  return true;
};

export default filesCheck;
