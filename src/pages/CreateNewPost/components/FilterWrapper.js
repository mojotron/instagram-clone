import Filter from './Filter';
import filters from '../../../data/filters.json';

const FilterWrapper = ({ setFilter }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto',
      }}
    >
      {filters.map(filter => (
        <Filter key={filter.id} filterData={filter} />
      ))}
    </div>
  );
};

export default FilterWrapper;
