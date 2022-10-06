import Filter from './Filter';

const FilterWrapper = ({ setFilter }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      <Filter filterCss="" filterName="Normal" setFilter={setFilter} />
      <Filter
        filterCss="grayscale(100%)"
        filterName="Clarendon"
        setFilter={setFilter}
      />
      <Filter
        filterCss="sepia(100%)"
        filterName="Gingham"
        setFilter={setFilter}
      />
      <Filter
        filterCss="saturate(50%)"
        filterName="Moon"
        setFilter={setFilter}
      />
      <Filter filterCss="contrast(2)" filterName="Lark" setFilter={setFilter} />
      <Filter
        filterCss="grayscale(100%)"
        filterName="Reyes"
        setFilter={setFilter}
      />
      <Filter filterCss="sepia(100%)" filterName="Juno" setFilter={setFilter} />
      <Filter
        filterCss="saturate(50%)"
        filterName="Slumber"
        setFilter={setFilter}
      />
      <Filter
        filterCss="contrast(2)"
        filterName="Crema"
        setFilter={setFilter}
      />
    </div>
  );
};

export default FilterWrapper;
