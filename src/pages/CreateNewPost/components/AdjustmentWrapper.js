import AdjustmentBar from './AdjustmentBar';
import './styles/AdjustmentWrapper.css';

const AdjustmentWrapper = ({ setFilter }) => {
  return (
    <div className="AdjustmentWrapper">
      <AdjustmentBar
        title={'brightness'}
        values={{ min: -100, max: 100, start: 0 }}
        setFilter={setFilter}
      />
      <AdjustmentBar
        title={'contrast'}
        values={{ min: -100, max: 100, start: 0 }}
        setFilter={setFilter}
      />
      <AdjustmentBar
        title={'saturation'}
        values={{ min: -100, max: 100, start: 0 }}
        setFilter={setFilter}
      />
      {/* <AdjustmentBar title={'temperature'} />
      <AdjustmentBar title={'fade'} />
      <AdjustmentBar title={'vignette'} /> */}
    </div>
  );
};

export default AdjustmentWrapper;
