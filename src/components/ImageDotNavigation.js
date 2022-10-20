import './styles/ImageDotNavigation.css';

const ImageDotNavigation = ({ index, numOfImgs }) => {
  if (numOfImgs < 2) return '';

  const dotElement = Array.from({ length: numOfImgs }, (_, i) => (
    <span
      key={i}
      data-testid="dot-navigation-dot"
      className={i === index ? 'active' : ''}
    />
  ));

  return (
    <div data-testid="dot-navigation" className="ImageDotNavigation">
      {dotElement}
    </div>
  );
};

export default ImageDotNavigation;
