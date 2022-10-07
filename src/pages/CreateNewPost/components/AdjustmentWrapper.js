import AdjustmentBar from './AdjustmentBar';
import './styles/AdjustmentWrapper.css';
import { useFiltersAndLayersContext } from '../../../hooks/useFiltersAndLayersContext';

const AdjustmentWrapper = () => {
  const { state, changeState } = useFiltersAndLayersContext();

  return (
    <div className="AdjustmentWrapper">
      <AdjustmentBar
        title={'brightness'}
        values={{ min: -100, max: 100, current: state['brightness'] }}
        // dispatch={dispatch}
        changeState={changeState}
      />
      <AdjustmentBar
        title={'contrast'}
        values={{ min: -100, max: 100, current: state['contrast'] }}
        // dispatch={dispatch}
        changeState={changeState}
      />
      <AdjustmentBar
        title={'saturation'}
        values={{ min: -100, max: 100, current: state['saturation'] }}
        // dispatch={dispatch}
        changeState={changeState}
      />
      <AdjustmentBar
        title={'temperature'}
        values={{ min: -100, max: 100, current: state['temperature'] }}
        // dispatch={dispatch}
        changeState={changeState}
      />
      <AdjustmentBar
        title={'fade'}
        values={{ min: -100, max: 100, current: state['fade'] }}
        // dispatch={dispatch}
        changeState={changeState}
      />
      <AdjustmentBar
        title={'vignette'}
        values={{ min: 0, max: 100, current: state['vignette'] }}
        // dispatch={dispatch}
        changeState={changeState}
      />
    </div>
  );
};

export default AdjustmentWrapper;
