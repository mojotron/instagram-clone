import React from 'react';

const ConfirmDelete = ({ btnText, handleClose, handleDelete }) => {
  return (
    <div className="child-overlay" style={{ zIndex: 35 }}>
      <div className="DiscardPost">
        <button className="btn discard" onClick={handleDelete}>
          {btnText}
        </button>

        <button className="btn" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
