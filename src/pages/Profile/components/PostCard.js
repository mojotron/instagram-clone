import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//components
import PostImage from '../../../components/PostImage';
// style
import './styles/PostCard.css';
//icons
import { TbBoxMultiple } from 'react-icons/tb';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

const PostCard = ({ data, dimensions }) => {
  const [hoverActive, setHoverActive] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="PostCard"
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      onClick={() => navigate(`/p/${data.id}`)}
    >
      {data.images.length > 1 && (
        <TbBoxMultiple
          size={23}
          className="PostCard__icon multi-file"
          color="white"
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
              <AiFillHeart size={23} />
              <span>{data.likes.length}</span>
            </p>
            <p>
              <FaComment size={23} />
              <span>{data.comments.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
