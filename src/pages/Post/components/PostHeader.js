import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import PostOptionsPopup from './PostOptionsPopup';
import EditPostPanel from './EditPostPanel';
// styles
import './styles/PostHeader.css';
// icon
import moreOptionsIcon from '../../../images/more-horiz-icon.svg';

const PostHeader = ({ type, owner, postData, handlers }) => {
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  return (
    <header className="PostHeader">
      {showOptions && (
        <PostOptionsPopup
          type={type}
          owner={owner}
          postData={postData}
          handlers={{
            ...handlers,
            handleClose: () => setShowOptions(false),
            handleOpenEdit: () => setShowEditPost(true),
          }}
        />
      )}

      {showEditPost && (
        <EditPostPanel
          postData={postData}
          closeHandler={() => setShowEditPost(false)}
          handleEditPost={handlers.editPost}
        />
      )}

      <div className="PostHeader__left">
        <Avatar
          url={postData.creator.avatarUrl}
          size="mid"
          handleClick={() => navigate(`/${postData.creator.userName}`)}
        />
        <div className="PostHeader__left__info">
          <h2 onClick={() => navigate(`/${postData.creator.userName}`)}>
            {postData.creator.userName}
          </h2>
          <h3>{postData.location}</h3>
        </div>
      </div>

      <button className="btn btn--options" onClick={() => setShowOptions(true)}>
        <img src={moreOptionsIcon} alt="post option" />
      </button>
    </header>
  );
};

export default PostHeader;
