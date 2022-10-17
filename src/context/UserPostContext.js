import { useEffect } from 'react';
import { createContext, useReducer, useState } from 'react';
import { getFilter, getLayers } from '../utils/filterLayers';

export const UserPostContext = createContext();

// post data
// single file
// collective properties

const initialFile = {
  file: null,
  edits: {
    brightness: '0',
    contrast: '0',
    saturation: '0',
    temperature: '0',
    fade: '0',
    vignette: '0',
  },
  alt: '',
};

const initialState = {
  files: [],
  dimensions: {
    aspectRatio: { width: '100%', height: '100%' },
    zoomLevel: '1',
    position: { x: 0, y: 0 },
  },
  postInfo: {
    caption: '',
    location: '',
    disabledLikes: false,
    disabledComments: false,
  },
};

// const userPostReducer = (state, action) => {};

export const UserPostContextProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(userPostReducer, {});
  const fileLimit = 3;
  const [files, setFiles] = useState(null);
  const [tempImageUrls, setTempImageUrls] = useState([]);

  // this is helper function to use PostImage component in other stages of post creation

  useEffect(() => {
    if (files === null) return;
    setTempImageUrls([...files].map(file => URL.createObjectURL(file)));
  }, [files]);

  const addFile = fileList => {
    const newFileList = new DataTransfer();
    [...files, ...fileList].forEach(file => newFileList.items.add(file));
    setFiles(newFileList.files);
  };

  const deleteFile = index => {
    console.log('x', index);
    const newFileList = new DataTransfer();
    [...files].forEach((file, i) => {
      if (i !== index) newFileList.items.add(file);
    });
    if (newFileList.files.length === 0) setFiles(null);
    else setFiles(newFileList.files);
  };

  const reorderFiles = newIndexes => {
    const newFileList = new DataTransfer();
    newIndexes
      .map(index => files.item(index))
      .forEach(file => newFileList.items.add(file));
    setFiles(newFileList.files);
  };

  return (
    <UserPostContext.Provider
      value={{
        files,
        setFiles,
        tempImageUrls,
        fileLimit,
        addFile,
        deleteFile,
        reorderFiles,
      }}
    >
      {children}
    </UserPostContext.Provider>
  );
};
