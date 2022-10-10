import { useState, useEffect, useRef } from 'react';
import './styles/ImageSizePanel.css';
// icons
import changeSizeIcon from '../../../images/change-size-icon.svg';
import zoomInIcon from '../../../images/zoom-in-icon.svg';
import multipleFilesIcon from '../../../images/multiple-files.svg';

const maxMove = currentZoom => {
  const percentIncrease = ((currentZoom - 1) / 1) * 100; // 1 is original zoom value (min value)
  return (percentIncrease / 2).toFixed(1);
};

const ImageSizePanel = ({ image }) => {
  // const imgUrl = URL.createObjectURL(image); outside for smoother animations
  //
  // using 1:1, 4:5(height/1.25:height), 16:9(width:width*0.5625)
  // original ratio create dom image -> take natural height and width =>
  // calculate aspect ratio with them => make width/height with percentages
  // with that aspect ratio
  //
  //for zoom level, zoom inner element with transform scale css
  // property, parent element has overflow hidden to hide spilling element
  //
  // image position use inner div with bg image and move it around, stop if you
  // get to parent rect. To calculate max move percent increase formula divide by 2
  const parentElementRef = useRef();

  const [originalRatio, setOriginalRatio] = useState(null);
  const [error, setError] = useState(null);
  const [imageSize, setImageSize] = useState({ width: '100%', height: '100%' });
  const [zoomLevel, setZoomLevel] = useState('1');
  // reposition image
  const [repositionActive, setRepositionActive] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [moveStart, setMoveStart] = useState({ x: null, y: null });
  // display options
  const [showSizes, setShowSizes] = useState(false);
  const [showZoomRange, setShowZoomRange] = useState(false);
  const [showMultiImages, setShowMultiImages] = useState(false);
  const [activeSize, setActiveSize] = useState('1:1');

  const closeAllOptions = () => {
    setShowSizes(false);
    setShowZoomRange(false);
    setShowMultiImages(false);
  };

  const handleShowSize = () => {
    closeAllOptions();
    setShowSizes(true);
  };

  const handleShowZoomRange = () => {
    closeAllOptions();
    setShowZoomRange(true);
  };

  const handleShowMultiImages = () => {
    closeAllOptions();
    setShowMultiImages(true);
  };

  useEffect(() => {
    if (originalRatio) return;
    setError(null);
    // get size of upload file to calculate original ratio
    const naturalImageSize = () => {
      const img = document.createElement('img');
      img.src = image;

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
        const ratio = 100 / (width / height);
        setOriginalRatio({ width: '100%', height: `${ratio}%` });
      })
      .catch(err => {
        console.log(err);
        setError('Unable to get original aspect ratio');
      });
  }, [image, originalRatio]);

  const handleReposition = e => {
    if (!repositionActive) return;
    const parent = parentElementRef.current.getBoundingClientRect();
    // get last position of user mouse move
    const lastX = ((moveStart.x - parent.left) / parent.width) * 100;
    const lastY = ((moveStart.y - parent.top) / parent.width) * 100;
    // get current position
    const x = ((e.clientX - parent.left) / parent.width) * 100;
    const y = ((e.clientY - parent.top) / parent.height) * 100;
    // calculate current move(mouse walk)
    const moveX = lastX - x;
    const moveY = lastY - y;

    const obj = {};
    // use maxMove to stop child pass parent container
    const maxImageMove = maxMove(zoomLevel);

    if (Math.abs(moveX) >= maxImageMove) {
      if (moveX > 0) obj.x = maxImageMove;
      else obj.x = -maxImageMove;
    } else {
      obj.x = moveX;
    }

    if (Math.abs(moveY) >= maxImageMove) {
      if (moveY > 0) obj.y = maxImageMove;
      else obj.y = -maxImageMove;
    } else {
      obj.y = moveY;
    }

    setImagePosition({ ...obj });
  };
  // TODO size reset on new ratio
  return (
    <div className="ImageSizePanel">
      <div className="ImageSizePanel__options">
        <div className="ImageSizePanel__options__left">
          <button
            className={`btn ${showSizes ? 'active' : ''}`}
            onClick={handleShowSize}
          >
            <img src={changeSizeIcon} alt="change size" />
          </button>

          <button
            className={`btn ${showZoomRange ? 'active' : ''}`}
            onClick={handleShowZoomRange}
          >
            <img src={zoomInIcon} alt="zoom in" />
          </button>
        </div>

        <button
          className={`btn ${showMultiImages ? 'active' : ''}`}
          onClick={handleShowMultiImages}
        >
          <img src={multipleFilesIcon} alt="zoom in" />
        </button>
      </div>

      {showSizes && (
        <div className="ImageSizePanel__size__list">
          {!error && (
            <button
              className={`btn ${activeSize === 'original' ? 'active' : ''}`}
              onClick={() => {
                setImagePosition({ x: 0, y: 0 });
                setImageSize(originalRatio);
                setActiveSize('original');
              }}
            >
              original
            </button>
          )}
          <button
            className={`btn ${activeSize === '1:1' ? 'active' : ''}`}
            onClick={() => {
              setImageSize({ width: '100%', height: '100%' });
              setActiveSize('1:1');
            }}
          >
            1:1
          </button>
          <button
            className={`btn ${activeSize === '4:5' ? 'active' : ''}`}
            onClick={() => {
              setImageSize({ width: '80%', height: '100%' });
              setActiveSize('4:5');
            }}
          >
            4:5
          </button>
          <button
            className={`btn ${activeSize === '16:9' ? 'active' : ''}`}
            onClick={() => {
              setImageSize({ width: '100%', height: '56.25%' });
              setActiveSize('16:9');
            }}
          >
            16:9
          </button>
        </div>
      )}

      {showZoomRange && (
        <div className="ImageSizePanel__zoom-range">
          <input
            type="range"
            value={zoomLevel}
            onChange={e => {
              setZoomLevel(e.target.value);
              setImagePosition({ x: 0, y: 0 });
            }}
            min="1"
            max="2"
            step="0.01"
          />
        </div>
      )}

      <div
        ref={parentElementRef}
        className="ImageSizePanel__imageContainer"
        style={{
          width: imageSize.width,
          height: imageSize.height,
        }}
        onClick={closeAllOptions}
      >
        <div
          className="ImageSizePanel__imageContainer__image"
          style={{
            transform: `scale(${zoomLevel})`,
            backgroundImage: `url("${image}")`,
            backgroundPosition: 'center center',
            top: `${imagePosition.y}%`, //
            left: `${imagePosition.x}%`, //
          }}
          onMouseDown={e => {
            if (zoomLevel !== '1') {
              setMoveStart({ x: e.clientX, y: e.clientY });
              setRepositionActive(true);
            }
          }}
          onMouseUp={e => setRepositionActive(false)}
          onMouseMove={e => handleReposition(e)}
          onMouseLeave={() => setRepositionActive(false)}
        ></div>
      </div>
    </div>
  );
};

export default ImageSizePanel;