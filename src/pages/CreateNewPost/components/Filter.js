import PostImage from '../../../components/PostImage';
import filterImg from '../../../images/ballon-filter.jpg';
// Photo by <a href="https://unsplash.com/@mudaum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Guilherme Garcia</a> on <a href="https://unsplash.com/s/photos/air-balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */
import './styles/Filter.css';
import { getFilter, getLayers } from '../../../utils/filterLayers';
import { useFiltersAndLayersContext } from '../../../hooks/useFiltersAndLayersContext';

const Filter = ({ filterName, filterData, active, setActiveFilter }) => {
  const { applyFilter } = useFiltersAndLayersContext();

  const handelClick = () => {
    setActiveFilter(filterName);
    applyFilter(filterData);
  };

  return (
    <div className="Filter" onClick={handelClick}>
      <div className={`Filter__image-wrapper ${active ? 'active' : ''}`}>
        <PostImage
          src={filterImg}
          aspectRatio={{ width: '100%', height: '100%' }}
          zoomLevel={'1'}
          position={{ x: 0, y: 0 }}
          cssFilter={getFilter(
            filterData.brightness,
            filterData.contrast,
            filterData.saturation
          )}
          layers={getLayers(
            filterData.temperature,
            filterData.fade,
            filterData.vignette
          )}
        />
      </div>

      {/* <img style={{ filter: filterCss }} src={filterImg} alt="filter" /> */}
      <h3 className={`${active ? 'active' : ''}`}>{filterName}</h3>
    </div>
  );
};

export default Filter;
