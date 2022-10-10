import './styles/ImageInfoPanel.css';
import PostImage from '../../../components/PostImage';

const ImageInfoPanel = ({ image }) => {
  return (
    <div className="ImageInfoPanel">
      <section className="ImageInfoPanel__image"></section>
      <section className="ImageInfoPanel__info"></section>
    </div>
  );
};

export default ImageInfoPanel;
