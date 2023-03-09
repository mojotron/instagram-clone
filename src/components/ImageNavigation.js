// style
import './styles/ImageNavigation.css';
// components
import ImageButton from './ImageButton';
// icons
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ImageNavigation = ({ index, setIndex, numOfImgs }) => {
  return (
    <div className="ImageNavigation">
      <ImageButton
        icon={<AiOutlineLeft size={25} color="white" />}
        active=""
        hidden={index === 0}
        handleClick={() => {
          setIndex(oldValue => oldValue - 1);
        }}
      />

      <ImageButton
        icon={<AiOutlineRight size={25} color="white" />}
        active=""
        hidden={index === numOfImgs - 1}
        handleClick={() => {
          setIndex(oldValue => oldValue + 1);
        }}
      />
    </div>
  );
};

export default ImageNavigation;
