import PostImage from '../../../components/PostImage';
import filterImg from '../../../images/ballon-filter.jpg';
// Photo by <a href="https://unsplash.com/@mudaum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Guilherme Garcia</a> on <a href="https://unsplash.com/s/photos/air-balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */
import './styles/Filter.css';
import { getFilter, getLayers } from '../../../utils/filterLayers';

const Filter = ({ filterData, setFilter }) => {
  return (
    <div className="Filter" onClick={() => {}}>
      <PostImage
        src={filterImg}
        cssFilter={getFilter(
          filterData.brightness,
          filterData.contrast,
          filterData.saturation
        )}
        imagePosition={'cover'}
        layers={getLayers(
          filterData.temperature,
          filterData.fade,
          filterData.vignette
        )}
      />
      {/* <img style={{ filter: filterCss }} src={filterImg} alt="filter" /> */}
      <h3>{filterData.title}</h3>
    </div>
  );
};

export default Filter;
