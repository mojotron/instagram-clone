import { useState } from 'react';
import './styles/ImageEditPanel.css';
// components
import FilterWrapper from './FilterWrapper';
import AdjustmentWrapper from './AdjustmentWrapper';
import PostImage from '../../../components/PostImage';

import { useFiltersAndLayersContext } from '../../../hooks/useFiltersAndLayersContext';
import { useEffect } from 'react';

const ImageEditPanel = ({ imageData }) => {
  const [optionsTab, setOptionsTab] = useState('filters');
  const [activeFilter, setActiveFilter] = useState('original');
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
  console.log('imagedata', imageData);
  return (
    <div className="ImageEditPanel">
      <section className="ImageEditPanel__image">
        <PostImage
          src={imageData.src}
          aspectRatio={imageData.aspectRatio}
          zoomLevel={imageData.zoomLevel}
          position={imageData.position}
          cssFilter={filter}
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
              <FilterWrapper
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
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
