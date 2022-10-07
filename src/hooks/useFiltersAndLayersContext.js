import { useContext } from 'react';
import { FiltersAndLayersContext } from '../context/FiltersAndLayersContext';

export const useFiltersAndLayersContext = () => {
  const context = useContext(FiltersAndLayersContext);
  if (!context)
    throw new Error(
      'useFiltersAndLayersContext must be used inside an FiltersAndLayersContextProvider'
    );
  return context;
};
