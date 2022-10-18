import { useState } from 'react';
import './styles/ImageEditPanel.css';
// components
import FilterWrapper from './FilterWrapper';
import AdjustmentWrapper from './AdjustmentWrapper';
import PostImage from '../../../components/PostImage';
import CreatePostHeader from './CreatePostHeader';
// context
import { useUserPostContext } from '../../../hooks/useUserPostContext';

const ImageEditPanel = () => {
  const { dimensions, imagesData, setCurrentStage } = useUserPostContext();

  const [imageIndex, setImageIndex] = useState(0);

  const [optionsTab, setOptionsTab] = useState('filters');
  const [activeFilter, setActiveFilter] = useState('original');

  const toggleOptionsTab = () => {
    setOptionsTab(oldValue =>
      oldValue === 'filters' ? 'adjustments' : 'filters'
    );
  };

  return (
    <>
      <CreatePostHeader
        title="Edit"
        btnText="Next"
        handleNext={() => setCurrentStage('post-information')}
      />

      <div className="ImageEditPanel">
        <section className="ImageEditPanel__image">
          {imagesData && (
            <PostImage
              imagesData={imagesData}
              dimensions={dimensions}
              getImageIndex={setImageIndex}
            />
          )}
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
                  currentIndex={imageIndex}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              </>
            )}
            {optionsTab === 'adjustments' && (
              <>
                <AdjustmentWrapper currentIndex={imageIndex} />
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ImageEditPanel;
