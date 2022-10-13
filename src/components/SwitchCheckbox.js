import './styles/SwitchCheckbox.css';

const SwitchCheckbox = ({ value, handleChange }) => {
  return (
    <label className="SwitchCheckbox">
      <input type="checkbox" value={value} onChange={handleChange} />
      <span className="SwitchCheckbox__slider"></span>
    </label>
  );
};

export default SwitchCheckbox;
