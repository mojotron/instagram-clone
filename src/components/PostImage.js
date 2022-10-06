import img from '../images/ballon-filter.jpg';
import './styles/PostImage.css';

const PostImage = ({ src, cssFilter, imagePosition, layers }) => {
  return (
    <div className="PostImage">
      <img
        style={{ ...cssFilter, objectFit: imagePosition }}
        src={src}
        alt=""
      />
      {layers &&
        layers.map(effect => (
          <div key={effect} className="PostImage__overlay" style={effect}></div>
        ))}
    </div>
  );
};

export default PostImage;
