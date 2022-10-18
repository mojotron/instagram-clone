import './styles/ManageImagePopup.css';
import { useUserPostContext } from '../../../hooks/useUserPostContext';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

const createArrOfIndexes = length =>
  Array.from({ length: length }, (_, i) => i);

const ManageImagePopup = ({ currentImage, setCurrentImage }) => {
  const { tempImageUrls, fileLimit, addFile, deleteFile, reorderFiles } =
    useUserPostContext();
  const [error, setError] = useState(null);

  const [arrayOrder, setArrayOrder] = useState([]);

  useEffect(() => {
    setArrayOrder(createArrOfIndexes(tempImageUrls.length));
  }, [tempImageUrls]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleChange = e => {
    setError(null);
    if (fileLimit === tempImageUrls.length) {
      setError('Maximum 3 images');
      return;
    }
    if (e.target.files[0].size > 5000000) {
      setError('File size to big, limit 5MB');
      return;
    }
    addFile(e.target.files);
  };

  const handleDoubleClick = (e, index) => {
    deleteFile(index);
    setCurrentImage(0);
  };

  const handleDragStart = (e, index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDragDrop = e => {
    const orderCopy = [...arrayOrder];
    const target = orderCopy[dragItem.current];
    orderCopy.splice(dragItem.current, 1);
    orderCopy.splice(dragOverItem.current, 0, target);

    reorderFiles(orderCopy);

    setCurrentImage(dragOverItem.current);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="ManageImagePopup">
      {tempImageUrls.map((ele, i) => (
        <div
          draggable
          key={ele}
          className={`ManageImagePopup__image ${
            currentImage === i ? 'active' : ''
          }`}
          onClick={() => setCurrentImage(i)}
          onDragStart={e => handleDragStart(e, i)}
          onDragEnter={e => handleDragEnter(e, i)}
          onDragEnd={handleDragDrop}
        >
          <button
            className="btn btn--remove"
            type="button"
            onDoubleClick={e => handleDoubleClick(e, i)}
          >
            x
          </button>
          <img src={ele} alt="temp" />
        </div>
      ))}

      <form>
        <label className="btn btn--add">
          +
          <input type="file" onChange={handleChange} />
        </label>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ManageImagePopup;
