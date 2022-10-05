import { useState } from 'react';
import './styles/ImageEditPanel.css';

import filterImg from '../../../images/ballon-filter.jpg';

const Filter = ({ filterCss, filterName, setFilter }) => {
  const filterValue = {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    fade: 0,
    vignette: 0,
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 0 15px',
      }}
      onClick={() => setFilter(filterCss)}
    >
      <img
        style={{
          width: '88px',
          height: '88px',
          filter: filterCss,
          borderRadius: '5px',
          overflow: 'hidden',
        }}
        src={filterImg}
        alt="filter"
      />
      {/* Photo by <a href="https://unsplash.com/@mudaum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Guilherme Garcia</a> on <a href="https://unsplash.com/s/photos/air-balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
      <h3 style={{ paddingTop: '5px', fontSize: '14px' }}>{filterName}</h3>
    </div>
  );
};

const FilterWrapper = ({ setFilter }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      <Filter filterCss="" filterName="Normal" setFilter={setFilter} />
      <Filter
        filterCss="grayscale(100%)"
        filterName="Normal"
        setFilter={setFilter}
      />
      <Filter
        filterCss="sepia(100%)"
        filterName="Normal"
        setFilter={setFilter}
      />
      <Filter
        filterCss="saturate(50%)"
        filterName="Normal"
        setFilter={setFilter}
      />
      <Filter
        filterCss="contrast(2)"
        filterName="Normal"
        setFilter={setFilter}
      />
      <Filter
        filterCss="grayscale(100%)"
        filterName="Normal"
        setFilter={setFilter}
      />
      <Filter
        filterCss="sepia(100%)"
        filterName="Normal"
        setFilter={setFilter}
      />
      <Filter
        filterCss="saturate(50%)"
        filterName="Normal"
        setFilter={setFilter}
      />
      <Filter
        filterCss="contrast(2)"
        filterName="Normal"
        setFilter={setFilter}
      />
    </div>
  );
};

const ImageEditPanel = ({ image }) => {
  const [optionsTab, setOptionsTab] = useState('filters');
  const [filter, setFilter] = useState('');

  const toggleOptionsTab = () => {
    setOptionsTab(oldValue =>
      oldValue === 'filters' ? 'adjustments' : 'filters'
    );
  };
  return (
    <div className="ImageEditPanel">
      <section className="ImageEditPanel__image">
        <img
          style={{ filter: filter }}
          src={URL.createObjectURL(image)}
          alt=""
        />
      </section>
      <section className="ImageEditPanel__edit">
        <div className="ImageEditPanel__edit__select">
          <button
            className={optionsTab === 'filters' ? 'active' : ''}
            onClick={toggleOptionsTab}
          >
            Filters
          </button>
          <button
            className={optionsTab === 'adjustments' ? 'active' : ''}
            onClick={toggleOptionsTab}
          >
            Adjustments
          </button>
        </div>
        <div className="ImageEditPanel__edit__options">
          {optionsTab === 'filters' && (
            <>
              <FilterWrapper setFilter={setFilter} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ImageEditPanel;
