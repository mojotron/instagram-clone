import './styles/ImageNavigation.css';
import ImageButton from './ImageButton';
//icons
import navigateLeftIcon from '../images/navigate-left-icon.svg';
import navigateRightIcon from '../images/navigate-right-icon.svg';

const ImageNavigation = ({ index, setIndex, numOfImgs, buttonHandler }) => {
  return (
    <div className="ImageNavigation">
      <ImageButton
        icon={navigateLeftIcon}
        alt="previous"
        active=""
        hidden={index === 0}
        handleClick={() => {
          setIndex(oldValue => oldValue - 1);
          buttonHandler && buttonHandler();
        }}
      />

      <ImageButton
        icon={navigateRightIcon}
        alt="next"
        active=""
        hidden={index === numOfImgs - 1}
        handleClick={() => {
          setIndex(oldValue => oldValue + 1);
          buttonHandler && buttonHandler();
        }}
      />
    </div>
  );
};

export default ImageNavigation;
