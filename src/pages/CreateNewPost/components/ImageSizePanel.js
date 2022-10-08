import { useState, useEffect } from 'react';
import './styles/ImageSizePanel.css';

const ImageSizePanel = ({ image }) => {
  // const imgUrl = URL.createObjectURL(image);
  const [originalRatio, setOriginalRatio] = useState(null);
  const [error, setError] = useState(null);
  const [imageSize, setImageSize] = useState({ width: '100%', height: '100%' });
  // using 1:1, 4:5(height/1.25:height), 16:9(width:width*0.5625)
  // original ratio create dom image -> take natural height and width =>
  // calculate aspect ratio with them => make width/height with percentages
  // with that aspect ratio

  useEffect(() => {
    if (originalRatio) return;
    console.log('hello');
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

  return (
    <div className="ImageSizePanel">
      <div className="ImageSizePanel__size-button">
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
      </div>
      <div
        className="ImageSizePanel__imageContainer"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          width: imageSize.width,
          height: imageSize.height,
        }}
      ></div>
    </div>
  );
};

export default ImageSizePanel;
