import { useReducer } from 'react';

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BRIGHTNESS':
      return { ...state, brightness: action.payload };
    case 'SET_CONTRAST':
      return { ...state, contrast: action.payload };
    case 'SET_SATURATION':
      return { ...state, saturation: action.payload };
    default:
      return state;
  }
};

const getFilterValue = value => parseInt(value) / 100 + 1;

export const useFilters = () => {
  const [state, dispatch] = useReducer(filterReducer, {
    brightness: null,
    contrast: null,
    saturation: null,
  });

  console.log(state);

  const createCssFilter = () => {
    const brightness = getFilterValue(state.brightness);
    const contrast = getFilterValue(state.contrast);
    const saturation = getFilterValue(state.saturation);

    return {
      filter: `brightness(${brightness}) contrast(${contrast}) saturation(${saturation})`,
    };
  };

  return { state, dispatch, createCssFilter };
};
