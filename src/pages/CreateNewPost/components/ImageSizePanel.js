import { useState, useEffect, useRef } from 'react';
import './styles/ImageSizePanel.css';
// icons
import changeSizeIcon from '../../../images/change-size-icon.svg';
import zoomInIcon from '../../../images/zoom-in-icon.svg';
import multipleFilesIcon from '../../../images/multiple-files.svg';
// components
import CreatePostHeader from './CreatePostHeader';
import ImageButton from '../../../components/ImageButton';
import ImageNavigation from '../../../components/ImageNavigation';
import ImageDotNavigation from '../../../components/ImageDotNavigation';
import ManageImagePopup from './ManageImagePopup';
// context
import { useUserPostContext } from '../../../hooks/useUserPostContext';
import { calcReposition } from '../../../utils/repositionElement';

const aspectRatios = [
  { ratio: '1:1', value: { width: '100%', height: '100%' } },
  { ratio: '4:5', value: { width: '80%', height: '100%' } },
  { ratio: '16:9', value: { width: '100%', height: '56.25%' } },
];

const ImageSizePanel = () => {
  const {
    setFiles,
    tempImageUrls,
    dimensions,
    setDimensions,
    setCurrentStage,
  } = useUserPostContext();

  const [currentImage, setCurrentImage] = useState(0);
  const parentElementRef = useRef();
  const [originalRatio, setOriginalRatio] = useState(null);
  const [calcOriginalRatio, setCalcOriginalRatio] = useState(true);
  const [error, setError] = useState(null);
  const [activeSize, setActiveSize] = useState('1:1');
  // reposition image
  const [repositionActive, setRepositionActive] = useState(false);
  const [moveStart, setMoveStart] = useState({ x: null, y: null });
  // display options
  const [showSizes, setShowSizes] = useState(false);
  const [showZoomRange, setShowZoomRange] = useState(false);
  const [showManageImages, setShowManageImages] = useState(false);

  const closeAllOptions = () => {
    setShowSizes(false);
    setShowZoomRange(false);
    setShowManageImages(false);
  };

  const handleShowSize = () => {
    closeAllOptions();
    setShowSizes(true);
  };

  const handleShowZoomRange = () => {
    closeAllOptions();
    setShowZoomRange(true);
  };

  const handleShowManageImages = () => {
    closeAllOptions();
    setShowManageImages(true);
  };

  useEffect(() => {
    if (tempImageUrls.length === 0) return;
    if (calcOriginalRatio === false) return;
    setError(null);
    // get size of upload file to calculate original aspect ratio
    const naturalImageSize = () => {
      const img = document.createElement('img');
      img.src = tempImageUrls[currentImage];

      const promise = new Promise((resolve, reject) => {
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          resolve({ width, height });
        };
        img.onerror = reject;
      });
      return promise;
    };

    naturalImageSize()
      .then(({ width, height }) => {
        const ratio =
          width > height ? 100 / (width / height) : 100 / (height / width);
        if (width > height) {
          setOriginalRatio({ width: '100%', height: `${ratio}%` });
        } else {
          setOriginalRatio({ width: `${ratio}%`, height: '100%' });
        }
        setCalcOriginalRatio(false);
      })
      .catch(err => {
        console.log(err);
        setError('Unable to get original aspect ratio');
        setCalcOriginalRatio(false);
      });
  }, [tempImageUrls, currentImage, originalRatio, calcOriginalRatio]);

  const handleReposition = e => {
    if (!repositionActive) return;
    const newPosition = calcReposition(
      { x: e.clientX, y: e.clientY },
      parentElementRef.current.getBoundingClientRect(),
      moveStart,
      dimensions.zoomLevel
    );
    setDimensions(oldValue => ({ ...oldValue, position: newPosition }));
  };

  return (
    <>
      <CreatePostHeader
        title="Crop"
        btnText="Next"
        handleNext={() => setCurrentStage('set-filter-layers')}
        handlePrev={() => {
          setFiles(null);
          setCurrentStage('choose-files');
        }}
      />

      <div
        data-testid="image-size-panel"
        className="ImageSizePanel"
        onMouseUp={() => setRepositionActive(false)}
        onMouseLeave={() => setRepositionActive(false)}
        onMouseDown={e => {
          // handler on parent element because button containers
          if (dimensions.zoomLevel !== '1') {
            setMoveStart({ x: e.clientX, y: e.clientY });
            setRepositionActive(true);
          }
        }}
      >
        <ImageNavigation
          index={currentImage}
          setIndex={setCurrentImage}
          numOfImgs={tempImageUrls.length}
        />
        <ImageDotNavigation
          index={currentImage}
          numOfImgs={tempImageUrls.length}
        />
        {/* dimension edit options */}
        <div className="ImageSizePanel__options">
          <div className="ImageSizePanel__options__left">
            <ImageButton
              icon={changeSizeIcon}
              alt="change size"
              active={showSizes}
              handleClick={handleShowSize}
            />
            <ImageButton
              icon={zoomInIcon}
              alt="zoom slider"
              active={showZoomRange}
              handleClick={handleShowZoomRange}
            />
          </div>
          <ImageButton
            icon={multipleFilesIcon}
            alt="add and arrange images"
            active={showManageImages}
            handleClick={handleShowManageImages}
          />
        </div>
        {/* aspect ratio dropdown */}
        {showSizes && (
          <div
            data-testid="change-size-popup"
            className="ImageSizePanel__size__list"
          >
            {!error && (
              <button
                className={`btn ${activeSize === 'original' ? 'active' : ''}`}
                onClick={() => {
                  setCalcOriginalRatio(true);
                  setDimensions(oldValue => ({
                    ...oldValue,
                    aspectRatio: originalRatio,
                    position: { x: 0, y: 0 },
                  }));
                  setActiveSize('original');
                }}
              >
                original
              </button>
            )}
            {aspectRatios.map((ar, i) => (
              <button
                key={i}
                className={`btn ${activeSize === ar.ratio ? 'active' : ''}`}
                onClick={() => {
                  setDimensions(oldValue => ({
                    ...oldValue,
                    aspectRatio: ar.value,
                  }));
                  setActiveSize(ar.ratio);
                }}
              >
                {ar.ratio}
              </button>
            ))}
          </div>
        )}
        {/* zoom range input*/}
        {showZoomRange && (
          <div
            data-testid="zoom-level-popup"
            className="ImageSizePanel__zoom-range"
          >
            <input
              data-testid="zoom-level-input"
              type="range"
              value={dimensions.zoomLevel}
              onChange={e => {
                setDimensions(oldValue => ({
                  ...oldValue,
                  zoomLevel: e.target.value,
                  position: { x: 0, y: 0 },
                }));
              }}
              min="1"
              max="2"
              step="0.01"
            />
          </div>
        )}
        {/* manage images */}
        {showManageImages && (
          <ManageImagePopup
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
        )}

        <div
          data-testid="size-panel-parent"
          ref={parentElementRef}
          title="Zoom image then reposition!"
          className="ImageSizePanel__imageContainer"
          style={{
            width: dimensions.aspectRatio.width,
            height: dimensions.aspectRatio.height,
          }}
          onClick={closeAllOptions}
        >
          <div
            data-testid="size-panel-child"
            className="ImageSizePanel__imageContainer__image"
            style={{
              transform: `scale(${dimensions.zoomLevel})`,
              backgroundImage: `url("${tempImageUrls[currentImage]}")`,
              top: `${dimensions.position.y}%`, //
              left: `${dimensions.position.x}%`, //
            }}
            onMouseMove={e => handleReposition(e)}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ImageSizePanel;
