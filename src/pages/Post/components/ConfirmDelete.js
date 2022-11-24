import React from 'react';

const ConfirmDelete = ({ handleClose, handleDelete }) => {
  return (
    <div className="child-overlay" style={{ zIndex: 35 }}>
      <div className="DiscardPost" style={{ zIndex: 40 }}>
        <button className="btn discard" onClick={() => console.log('hello')}>
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
