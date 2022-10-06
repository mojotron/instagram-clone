import { useState } from 'react';
import './styles/ImageEditPanel.css';
// components
import FilterWrapper from './FilterWrapper';
import AdjustmentWrapper from './AdjustmentWrapper';
import PostImage from '../../../components/PostImage';

import { useFilters } from '../../../hooks/useFilters';
import { useEffect } from 'react';

// const filters = {
//   normal: {
//     name: 'normal',
//     filterCss:
//       'contrast(120%) brightness(125%) saturate(100%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px);',
//   },
//   clarendon: {},
//   gingham: {},
//   moon: {},
//   lark: {},
//   reyes: {},
//   juno: {},
//   slumber: {},
//   crema: {},
//   ludwig: {},
//   aden: {},
//   perpetua: {},
// };

const ImageEditPanel = ({ image }) => {
  const [optionsTab, setOptionsTab] = useState('filters');

  const [filter, setFilter] = useState('');

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
          imagePosition="contain"
          layers={[]}
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
