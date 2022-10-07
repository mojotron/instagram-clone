import { useState } from 'react';
import './styles/ImageEditPanel.css';
// components
import FilterWrapper from './FilterWrapper';
import AdjustmentWrapper from './AdjustmentWrapper';
import PostImage from '../../../components/PostImage';

import { useFiltersAndLayersContext } from '../../../hooks/useFiltersAndLayersContext';
import { useEffect } from 'react';

const ImageEditPanel = ({ image }) => {
  const [optionsTab, setOptionsTab] = useState('filters');

  const [filter, setFilter] = useState('');
  const [layers, setLayers] = useState([]);

  const { createCssFilter, createCssLayers } = useFiltersAndLayersContext();

  useEffect(() => {
    setFilter(createCssFilter());
    setLayers(createCssLayers());
  }, [createCssFilter, createCssLayers]);

  const toggleOptionsTab = () => {
    setOptionsTab(oldValue =>
      oldValue === 'filters' ? 'adjustments' : 'filters'
    );
  };
  return (
    <div className="ImageEditPanel">
      <section className="ImageEditPanel__image">
        <PostImage
          src={URL.createObjectURL(image)}
          cssFilter={filter}
          imagePosition="cover"
          layers={layers}
        />
      </section>
      <section className="ImageEditPanel__edit">
        <div className="ImageEditPanel__edit__select">
          <button
            className={optionsTab === 'filters' ? 'active' : ''}
            onClick={toggleOptionsTab}
          >
            Filters
          </button>
          <button
            className={optionsTab === 'adjustments' ? 'active' : ''}
            onClick={toggleOptionsTab}
          >
            Adjustments
          </button>
        </div>
        <div className="ImageEditPanel__edit__options">
          {optionsTab === 'filters' && (
            <>
              <FilterWrapper />
            </>
          )}
          {optionsTab === 'adjustments' && (
            <>
              <AdjustmentWrapper setFilter={setFilter} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ImageEditPanel;
