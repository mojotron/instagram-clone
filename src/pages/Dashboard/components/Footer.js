import Navbar from './Navbar';
import './styles/Footer.css';

const Footer = ({ screenSize }) => {
  return (
    <div className="Footer">
      <Navbar direction="row" screenSize={screenSize} />
    </div>
  );
};

export default Footer;
