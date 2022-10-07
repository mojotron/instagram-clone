import { useState, useEffect } from 'react';
import './styles/AdjustmentBar.css';

const AdjustmentBar = ({ title, values, changeState }) => {
  const [bold, setBold] = useState(false);
  const [showResetBtn, setShowResetBtn] = useState(false);

  const handleChange = e => {
    handleBtnDisplay();
    changeState(title, e.target.value);
  };

  const handleReset = () => {
    changeState(title, '0');
  };

  useEffect(() => {
    if (values.current !== '0') return;
    setShowResetBtn(false);
  }, [title, values]);

  const handleBtnDisplay = () => {
    if (values.current === '0') return;
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
          value={values.current}
          min={values.min}
          max={values.max}
          onChange={handleChange}
          onMouseDown={() => setBold(true)}
          onMouseUp={() => setBold(false)}
        />
        <span style={{ fontWeight: bold ? '700' : '400' }}>
          {values.current}
        </span>
      </div>
    </div>
  );
};

export default AdjustmentBar;
