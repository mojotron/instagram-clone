import { createContext, useReducer } from 'react';
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

const userPostReducer = (state, action) => {};

export const UserPostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userPostReducer, {});

  return (
    <UserPostContext.Provider value={{ state, dispatch }}>
      {children}
    </UserPostContext.Provider>
  );
};
