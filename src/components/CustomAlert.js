import './styles/CustomAlert.css';

const CustomAlert = ({ message }) => {
  return (
    <div className="CustomAlert">
      <h3>Instagram Clone Alert!</h3>
      <p>{message}</p>
      <p className="CustomAlert__tip">Press escape to exit!</p>
    </div>
  );
};

export default CustomAlert;
