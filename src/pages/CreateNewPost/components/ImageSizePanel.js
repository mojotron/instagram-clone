import { useState, useEffect, useRef } from 'react';
import './styles/ImageSizePanel.css';

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
  const parentElementRef = useRef();
  const imageElementRef = useRef();

  const [originalRatio, setOriginalRatio] = useState(null);
  const [error, setError] = useState(null);
  const [imageSize, setImageSize] = useState({ width: '100%', height: '100%' });
  const [zoomLevel, setZoomLevel] = useState('1');
  // reposition image
  const [repositionActive, setRepositionActive] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [temp, setTemp] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.addEventListener('onmouseup', () => {});
  }, [zoomLevel]);

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
    console.log('yo');
    const parent = parentElementRef.current.getBoundingClientRect();
    const child = imageElementRef.current.getBoundingClientRect();

    const moveX = e.clientX - temp.x;
    const moveY = e.clientY - temp.y;

    setImagePosition(oldValue => {
      return { x: e.clientX - parent.left, y: parent.top - e.clientY };
    });
  };

  return (
    <div className="ImageSizePanel">
      <div className="ImageSizePanel__size-buttons">
        {!error && (
          <button onClick={() => setImageSize(originalRatio)}>original</button>
        )}
        <button onClick={() => setImageSize({ width: '100%', height: '100%' })}>
          1-1
        </button>
        <button onClick={() => setImageSize({ width: '80%', height: '100%' })}>
          4-5
        </button>
        <button
          onClick={() => setImageSize({ width: '100%', height: '56.25%' })}
        >
          16-9
        </button>

        <div>
          <input
            type="range"
            value={zoomLevel}
            onChange={e => setZoomLevel(e.target.value)}
            min="1"
            max="2"
            step="0.01"
          />
        </div>
      </div>

      <div
        ref={parentElementRef}
        className="ImageSizePanel__imageContainer"
        style={{
          width: imageSize.width,
          height: imageSize.height,
        }}
      >
        <div
          ref={imageElementRef}
          className="ImageSizePanel__imageContainer__image"
          style={{
            transform: `scale(${zoomLevel})`,
            backgroundImage: `url("${image}")`,
            backgroundPosition: `center center`,
            top: `${imagePosition.y}px`,
            left: `${imagePosition.x}px`,
          }}
          onMouseDown={e => {
            setTemp({ x: e.clientX, y: e.clientY });
            setRepositionActive(true);
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
