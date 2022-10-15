import './styles/PostImage.css';

const PostImage = ({
  imagesData,
  src,
  aspectRatio,
  zoomLevel,
  position,
  cssFilter,
  layers,
}) => {
  const childStyles = {
    filter: cssFilter,
    transform: `scale(${zoomLevel})`,
    top: `${position.y}%`, //
    left: `${position.x}%`, //
  };
  return (
    <div className="PostImage">
      <div
        className="PostImage__container"
        style={{ height: aspectRatio.height, width: aspectRatio.width }}
      >
        <img
          className="PostImage__container__image"
          style={childStyles}
          src={src}
          alt="alt"
        />

        {layers &&
          layers.map((effect, i) => (
            <div key={i} className="PostImage__overlay" style={effect}></div>
          ))}
      </div>
    </div>
  );
};

export default PostImage;
