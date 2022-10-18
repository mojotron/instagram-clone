import './styles/ImageDotNavigation.css';

const ImageDotNavigation = ({ index, numOfImgs }) => {
  if (numOfImgs < 2) return '';

  const dotElement = Array.from({ length: numOfImgs }, (_, i) => (
    <span key={i} className={i === index ? 'active' : ''} />
  ));

  return <div className="ImageDotNavigation">{dotElement}</div>;
};

export default ImageDotNavigation;
