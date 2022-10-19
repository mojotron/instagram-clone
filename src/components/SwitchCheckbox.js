import './styles/SwitchCheckbox.css';

const SwitchCheckbox = ({ value, name, handleChange }) => {
  return (
    <label className="SwitchCheckbox">
      <input
        type="checkbox"
        value={value}
        name={name}
        onChange={handleChange}
      />
      <span className="SwitchCheckbox__slider"></span>
    </label>
  );
};

export default SwitchCheckbox;
