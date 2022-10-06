import filterImg from '../../../images/ballon-filter.jpg';
// Photo by <a href="https://unsplash.com/@mudaum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Guilherme Garcia</a> on <a href="https://unsplash.com/s/photos/air-balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */
import './styles/Filter.css';

const Filter = ({ filterCss, filterName, setFilter }) => {
  return (
    <div className="Filter" onClick={() => setFilter(filterCss)}>
      <img style={{ filter: filterCss }} src={filterImg} alt="filter" />
      <h3>{filterName}</h3>
    </div>
  );
};

export default Filter;
