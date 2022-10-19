import PostImage from '../../../components/PostImage';
import filterImg from '../../../images/ballon-filter.jpg';
// Photo by <a href="https://unsplash.com/@mudaum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Guilherme Garcia</a> on <a href="https://unsplash.com/s/photos/air-balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */
import './styles/Filter.css';
import { getFilter, getLayers } from '../../../utils/filterLayers';

import { useUserPostContext } from '../../../hooks/useUserPostContext';

const Filter = ({ filterName, filterData, currentIndex }) => {
  const { imagesData, setImagesData } = useUserPostContext();

  const handelClick = () => {
    setImagesData(oldData => {
      // need current index
      const temp = oldData.map((ele, i) => {
        if (i !== currentIndex) return ele;
        else
          return {
            ...ele,
            filterName,
            imageAdjustments: filterData,
            filter: getFilter(
              filterData.brightness,
              filterData.contrast,
              filterData.saturation
            ),
            layers: getLayers(
              filterData.temperature,
              filterData.fade,
              filterData.vignette
            ),
          };
      });
      return temp;
    });
  };

  if (!imagesData) return;
  return (
    <div className="Filter" onClick={handelClick}>
      <div
        className={`Filter__image-wrapper ${
          imagesData[currentIndex].filterName === filterName ? 'active' : ''
        }`}
      >
        <PostImage
          dimensions={{
            aspectRatio: { width: '100%', height: '100%' },
            zoomLevel: '1',
            position: { x: 0, y: 0 },
          }}
          imagesData={[
            {
              url: filterImg,
              alt: 'premade filter',
              filter: getFilter(
                filterData.brightness,
                filterData.contrast,
                filterData.saturation
              ),
              layers: getLayers(
                filterData.temperature,
                filterData.fade,
                filterData.vignette
              ),
            },
          ]}
        />
      </div>

      <h3
        className={`${
          imagesData[currentIndex].filterName === filterName ? 'active' : ''
        }`}
      >
        {filterName}
      </h3>
    </div>
  );
};

export default Filter;
