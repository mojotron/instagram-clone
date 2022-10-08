import { useState } from 'react';
import { createContext } from 'react';
import { getFilter, getLayers } from '../utils/filterLayers';

export const FiltersAndLayersContext = createContext();

const initialState = {
  brightness: '0',
  contrast: '0',
  saturation: '0',
  temperature: '0',
  fade: '0',
  vignette: '0',
};

export const FiltersAndLayersContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const changeState = (option, value) => {
    setState(oldState => ({ ...oldState, [option]: value }));
  };

  const createCssFilter = () => {
    return getFilter(state.brightness, state.contrast, state.saturation);
  };

  const createCssLayers = () => {
    return getLayers(state.temperature, state.fade, state.vignette);
  };

  const applyFilter = data => {
    setState(data);
  };

  return (
    <FiltersAndLayersContext.Provider
      value={{
        state,
        changeState,
        createCssFilter,
        createCssLayers,
        applyFilter,
      }}
    >
      {children}
    </FiltersAndLayersContext.Provider>
  );
};
