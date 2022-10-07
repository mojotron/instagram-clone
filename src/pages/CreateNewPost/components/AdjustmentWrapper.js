import AdjustmentBar from './AdjustmentBar';
import './styles/AdjustmentWrapper.css';
import { useFiltersAndLayersContext } from '../../../hooks/useFiltersAndLayersContext';

const adjustments = [
  { id: 0, title: 'brightness', min: -100, max: 100 },
  { id: 1, title: 'contrast', min: -100, max: 100 },
  { id: 2, title: 'saturation', min: -100, max: 100 },
  { id: 3, title: 'temperature', min: -100, max: 100 },
  { id: 4, title: 'fade', min: -100, max: 100 },
  { id: 5, title: 'vignette', min: 0, max: 100 },
];

const AdjustmentWrapper = () => {
  const { state, changeState } = useFiltersAndLayersContext();

  return (
    <div className="AdjustmentWrapper">
      {adjustments.map(adjustment => (
        <AdjustmentBar
          key={adjustment.id}
          title={adjustment.title}
          values={{
            min: adjustment.min,
            max: adjustment.max,
            current: state[adjustment.title],
          }}
          changeState={changeState}
        />
      ))}
    </div>
  );
};

export default AdjustmentWrapper;
