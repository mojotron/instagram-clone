import { useState, useEffect } from 'react';
import './styles/AdjustmentBar.css';

const AdjustmentBar = ({
  title,
  values,
  changeState,
  currentIndex,
  updateFiltersAndLayers,
}) => {
  const [bold, setBold] = useState(false);
  const [showResetBtn, setShowResetBtn] = useState(false);
  // local state because sometimes live adjustment change crash browser
  const [rangeValue, setRangeValue] = useState(values.current);

  const handleChange = e => {
    handleBtnDisplay();
    //changeState(title, e.target.value);
    setRangeValue(e.target.value);
  };

  const handleReset = () => {
    changeState(oldState => {
      const temp = oldState.map((ele, i) => {
        if (i === currentIndex) {
          return {
            ...ele,
            imageAdjustments: { ...ele.imageAdjustments, [title]: '0' },
          };
        } else {
          return ele;
        }
      });
      return temp;
    });
    updateFiltersAndLayers();
    setRangeValue('0');
  };

  const handleApplyChange = () => {
    // local state because sometimes live adjustment change crash browser
    // and range slider slides smooth
    setBold(false);
    // changeState(title, rangeValue);
    changeState(oldState => {
      const temp = oldState.map((ele, i) => {
        if (i === currentIndex) {
          return {
            ...ele,
            imageAdjustments: { ...ele.imageAdjustments, [title]: rangeValue },
          };
        } else {
          return ele;
        }
      });
      return temp;
    });
    updateFiltersAndLayers();
  };

  useEffect(() => {
    if (rangeValue !== '0') return;
    setShowResetBtn(false);
  }, [rangeValue]);

  const handleBtnDisplay = () => {
    if (rangeValue === '0') return;
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
          value={rangeValue}
          min={values.min}
          max={values.max}
          onChange={handleChange}
          onMouseDown={() => setBold(true)}
          onMouseUp={handleApplyChange}
        />
        <span
          data-testid="adjustment-number"
          style={{ fontWeight: bold ? '700' : '400' }}
        >
          {rangeValue}
        </span>
      </div>
    </div>
  );
};

export default AdjustmentBar;
