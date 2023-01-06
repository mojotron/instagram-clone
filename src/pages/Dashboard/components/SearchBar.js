import './styles/Search.css';
// icons
import { IoIosCloseCircle } from 'react-icons/io';

const SearchBar = () => {
  return (
    <form className="SearchBar">
      <label>
        <input type="text" />
        <IoIosCloseCircle size={15} />
      </label>
    </form>
  );
};

export default SearchBar;
