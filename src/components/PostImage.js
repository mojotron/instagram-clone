import './styles/PostImage.css';

const PostImage = ({ src, cssFilter, imagePosition, layers }) => {
  const styles = { filter: cssFilter, objectFit: imagePosition };

  return (
    <div className="PostImage">
      <img style={styles} src={src} alt="" />
      {layers &&
        layers.map((effect, i) => (
          <div key={i} className="PostImage__overlay" style={effect}></div>
        ))}
    </div>
  );
};

export default PostImage;
