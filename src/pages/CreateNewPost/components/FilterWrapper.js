import Filter from './Filter';
import filters from '../../../data/filters.json';
import './styles/FilterWrapper.css';

const FilterWrapper = ({ currentIndex }) => {
  return (
    <div className="FilterWrapper">
      {filters.map(filter => (
        <Filter
          currentIndex={currentIndex}
          key={filter.id}
          filterName={filter.title}
          filterData={filter.data}
          
        />
      ))}
    </div>
  );
};

export default FilterWrapper;
