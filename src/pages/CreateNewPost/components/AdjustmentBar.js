import { useState, useEffect } from 'react';
import './styles/AdjustmentBar.css';
import { useFilters } from '../../../hooks/useFilters';

const AdjustmentBar = ({ title, values, setFilter }) => {
  const [bold, setBold] = useState(false);
  const [showResetBtn, setShowResetBtn] = useState(false);
  const [value, setValue] = useState('0');
  const { dispatch, createCssFilter } = useFilters();

  const handleChange = e => {
    setValue(e.target.value);
    handleBtnDisplay();
    dispatch({ type: `SET_${title.toUpperCase()}`, payload: e.target.value });
  };

  const handleReset = () => {
    setValue('0');
    dispatch({ type: `SET_${title.toUpperCase()}`, payload: '0' });
  };

  useEffect(() => {
    setFilter(createCssFilter());
    if (value !== '0') return;
    setShowResetBtn(false);
  }, [value]);

  const handleBtnDisplay = () => {
    if (value === '0') return;
    setShowResetBtn(true);
  };

  return (
    <div
      className="AdjustmentBar"
      onMouseEnter={handleBtnDisplay}
      onMouseLeave={() => setShowResetBtn(false)}
    >
      <div className="AdjustmentBar__title">
        <label htmlFor={`slider-${title}`}>{title}</label>
        <button
          style={{ visibility: showResetBtn ? 'visible' : 'hidden' }}
          className="btn AdjustmentBar__title__btn"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="AdjustmentBar__slider">
        <input
          className="AdjustmentBar__slider--slider"
          id={`slider-${title}`}
          type="range"
          name={title}
          value={value}
          min={values.min}
          max={values.max}
          onChange={handleChange}
          onMouseDown={() => setBold(true)}
          onMouseUp={() => setBold(false)}
        />
        <span style={{ fontWeight: bold ? '700' : '400' }}>{value}</span>
      </div>
    </div>
  );
};

export default AdjustmentBar;
