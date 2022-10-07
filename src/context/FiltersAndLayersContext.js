import { useState } from 'react';
import { createContext } from 'react';
import { getTemperature, getFade, getVignette } from '../utils/filterLayers';

export const FiltersAndLayersContext = createContext();

const initialState = {
  brightness: '0',
  contrast: '0',
  saturation: '0',
  temperature: '0',
  fade: '0',
  vignette: '0',
};

const getFilterValue = value => parseInt(value) / 100 + 1;

export const FiltersAndLayersContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const changeState = (option, value) => {
    setState(oldState => ({ ...oldState, [option]: value }));
  };

  const createCssFilter = () => {
    const brightness = getFilterValue(state.brightness);
    const contrast = getFilterValue(state.contrast);
    const saturation = getFilterValue(state.saturation);

    return `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`;
  };

  const createCssLayers = () => {
    const temperature = getTemperature(state.temperature);
    const fade = getFade(state.fade);
    const vignette = getVignette(state.vignette);

    return [temperature, fade, vignette];
  };

  return (
    <FiltersAndLayersContext.Provider
      value={{ state, changeState, createCssFilter, createCssLayers }}
    >
      {children}
    </FiltersAndLayersContext.Provider>
  );
};
