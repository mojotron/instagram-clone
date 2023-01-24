import React from 'react';

const PostOptionsPopupButton = ({ btnText, handleClick, discardBtn }) => {
  return (
    <button
      className={`btn${discardBtn ? ' discard' : ''}`}
      onClick={handleClick}
    >
      {btnText}
    </button>
  );
};

export default PostOptionsPopupButton;
