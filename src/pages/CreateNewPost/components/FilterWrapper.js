import Filter from './Filter';
import filters from '../../../data/filters.json';
import './styles/FilterWrapper.css';

const FilterWrapper = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="FilterWrapper">
      {filters.map(filter => (
        <Filter
          key={filter.id}
          filterName={filter.title}
          filterData={filter.data}
          active={filter.title === activeFilter}
          setActiveFilter={setActiveFilter}
        />
      ))}
    </div>
  );
};

export default FilterWrapper;
