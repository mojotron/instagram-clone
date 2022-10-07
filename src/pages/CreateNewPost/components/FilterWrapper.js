import Filter from './Filter';
import filters from '../../../data/filters.json';

const FilterWrapper = ({ setFilter }) => {
  return (
    <div
      style={{
        height: 'inherit',
        width: 'inherit',
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto',
        overflowY: 'scroll',
        paddingBottom: '70px',
      }}
    >
      {filters.map(filter => (
        <Filter key={filter.id} filterData={filter} />
      ))}
    </div>
  );
};

export default FilterWrapper;
