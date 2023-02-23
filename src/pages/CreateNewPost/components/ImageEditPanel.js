// hooks
import { useState } from 'react';
import { useUserPostContext } from '../../../hooks/useUserPostContext';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';
// style
import './styles/ImageEditPanel.css';
// components
import FilterWrapper from './FilterWrapper';
import AdjustmentWrapper from './AdjustmentWrapper';
import PostImage from '../../../components/PostImage';
import CreatePostHeader from './CreatePostHeader';

const ImageEditPanel = () => {
  const { screenSize } = useScreenSizeContext();

  const { dimensions, imagesData, setCurrentStage } = useUserPostContext();

  const [imageIndex, setImageIndex] = useState(0);

  const [optionsTab, setOptionsTab] = useState('filters');

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
        handlePrev={() => setCurrentStage('set-dimensions')}
        handleNext={() => setCurrentStage('post-information')}
      />

      <div
        className="ImageEditPanel"
        style={
          screenSize === 'small'
            ? {
                flexDirection: 'column',
                height: '90vh',
                width: '335px',
                overflowY: 'scroll',
              }
            : { flexDirection: 'row' }
        }
      >
        <section
          className="ImageEditPanel__image"
          style={
            screenSize === 'small'
              ? { height: '335px', width: '335px' }
              : { height: '435px', width: '435px' }
          }
        >
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
                <FilterWrapper currentIndex={imageIndex} />
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
