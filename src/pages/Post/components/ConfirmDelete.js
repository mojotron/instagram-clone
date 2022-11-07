import React from 'react';

const ConfirmDelete = ({ handleClose, handleDelete }) => {
  return (
    <div className="child-overlay">
      <div className="DiscardPost">
        <button
          className="btn discard"
          style={{ border: 'none' }}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="btn" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
