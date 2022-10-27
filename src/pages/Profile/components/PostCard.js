import PostImage from '../../../components/PostImage';
import './styles/PostCard.css';
//icons
import multiImageIcon from '../../../images/multiple-files.svg';
import likeIcon from '../../../images/heart-icon.svg';
import commentIcon from '../../../images/comment-icon.svg';

import { useState } from 'react';

const PostCard = ({ imagesData, dimensions }) => {
  // make sure image data is array
  const [hoverActive, setHoverActive] = useState(false);

  return (
    <div
      className="PostCard"
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
    >
      {imagesData.length > 1 && (
        <img
          className="PostCard__icon multi-file"
          src={multiImageIcon}
          alt="multiple images"
        />
      )}
      <PostImage
        //display only first img and hide navigation
        imagesData={[imagesData[0]]}
        // override aspect ratio to cover whole card
        dimensions={{
          ...dimensions,
          aspectRatio: { width: '100%', height: '100%' },
        }}
      />
      {hoverActive && (
        <div className="PostCard__overlay">
          <div className="PostCard__overlay__icons">
            <p>
              <img src={likeIcon} alt="likes count" /> <span>{0}</span>
            </p>
            <p>
              <img src={commentIcon} alt="comments count" /> <span>{0}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
