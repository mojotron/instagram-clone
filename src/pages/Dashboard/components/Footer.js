import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';
import Navbar from './Navbar';
import './styles/Footer.css';

const Footer = () => {
  const { screenSize } = useScreenSizeContext();
  return (
    <div className="Footer">
      <Navbar direction="row" screenSize={screenSize} />
    </div>
  );
};

export default Footer;
