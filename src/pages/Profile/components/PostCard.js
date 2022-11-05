import PostImage from '../../../components/PostImage';
import './styles/PostCard.css';
//icons
import multiImageIcon from '../../../images/multiple-files.svg';
import likeIcon from '../../../images/heart-black-icon.svg';
import commentIcon from '../../../images/comment-icon.svg';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ data, dimensions, linkState }) => {
  // make sure image data is array
  const [hoverActive, setHoverActive] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="PostCard"
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      onClick={() => navigate(`/p/${linkState.postId}`, { state: linkState })}
    >
      {data.images.length > 1 && (
        <img
          className="PostCard__icon multi-file"
          src={multiImageIcon}
          alt="multiple images"
        />
      )}
      <PostImage
        //display only first img and hide navigation
        imagesData={[data.images[0]]}
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
              <img src={likeIcon} alt="likes count" />{' '}
              <span>{data.likes.length}</span>
            </p>
            <p>
              <img src={commentIcon} alt="comments count" />{' '}
              <span>{data.comments.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
