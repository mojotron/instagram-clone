import './styles/PostHeader.css';
import Avatar from '../../../components/Avatar';
import { useNavigate } from 'react-router-dom';
import moreOptionsIcon from '../../../images/more-horiz-icon.svg';
import PostOptionsPopup from './PostOptionsPopup';
import EditPostPanel from './EditPostPanel';
import { useState } from 'react';

const PostHeader = ({ owner, postData, handlers }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  return (
    <header className="PostHeader">
      {showOptions && (
        <PostOptionsPopup
          owner={owner}
          postData={postData}
          handlers={{
            ...handlers,
            close: () => setShowOptions(false),
            openEdit: setShowEditPost,
          }}
        />
      )}

      {showEditPost && (
        <EditPostPanel
          postData={postData}
          closeHandler={() => setShowEditPost(false)}
          editPostHandler={handlers.editPost}
        />
      )}

      <div className="PostHeader__left">
        <Avatar
          url={postData.creator.avatarUrl}
          size="mid"
          handleClick={() => navigate(`/${postData.creator.userName}`)}
        />
        <h2 onClick={() => navigate(`/${postData.creator.userName}`)}>
          {postData.creator.userName}
        </h2>
      </div>

      <button className="btn btn--options" onClick={() => setShowOptions(true)}>
        <img src={moreOptionsIcon} alt="post option" />
      </button>
    </header>
  );
};

export default PostHeader;
