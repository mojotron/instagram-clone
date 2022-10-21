import { useEffect } from 'react';
import { useState } from 'react';
import ImageDotNavigation from './ImageDotNavigation';
import ImageNavigation from './ImageNavigation';
import './styles/PostImage.css';

const PostImage = ({ imagesData, dimensions, getImageIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!getImageIndex) return;
    getImageIndex(currentIndex);
  }, [currentIndex, getImageIndex]);

  return (
    <div className="PostImage">
      <ImageNavigation
        index={currentIndex}
        setIndex={setCurrentIndex}
        numOfImgs={imagesData.length}
      />

      <ImageDotNavigation index={currentIndex} numOfImgs={imagesData.length} />
      <div
        data-testid="post-image-container"
        className="PostImage__container"
        style={{
          height: dimensions.aspectRatio.height,
          width: dimensions.aspectRatio.width,
        }}
      >
        <img
          className="PostImage__container__image"
          style={{
            filter: imagesData[currentIndex].filter,
            transform: `scale(${dimensions.zoomLevel})`,
            top: `${dimensions.position.y}%`,
            left: `${dimensions.position.x}%`,
          }}
          src={imagesData[currentIndex].url}
          alt={imagesData[currentIndex].alt}
        />

        {imagesData[currentIndex].layers.map((effect, i) => (
          <div
            data-testid="post-image-layer"
            key={i}
            className="PostImage__overlay"
            style={effect}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PostImage;
