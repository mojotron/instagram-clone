import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../../hooks/useFirestore';
// components
import Avatar from '../../../components/Avatar';
import PostOptionsPopup from './PostOptionsPopup';
import EditPostPanel from './EditPostPanel';
// styles
import './styles/PostHeader.css';
// icon
import { FiMoreHorizontal } from 'react-icons/fi';

const PostHeader = ({ type, postData }) => {
  const { response, getDocumentById } = useFirestore('users');
  const navigate = useNavigate();

  const loadUser = useRef(() => getDocumentById(postData.creator)).current;

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const [showOptions, setShowOptions] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  if (!response?.document) return;

  return (
    <header className="PostHeader">
      {showOptions && (
        <PostOptionsPopup
          type={type}
          userData={response.document}
          postData={postData}
          handleClose={() => setShowOptions(false)}
          handleOpenEdit={() => setShowEditPost(true)}
        />
      )}

      {showEditPost && (
        <EditPostPanel
          postData={postData}
          closeHandler={() => setShowEditPost(false)}
        />
      )}

      <div className="PostHeader__left">
        <Avatar
          url={response.document?.avatar.url}
          size={32}
          handleClick={() => navigate(`/${response.document?.userName}`)}
        />
        <div className="PostHeader__left__info">
          <h2 onClick={() => navigate(`/${response.document?.userName}`)}>
            {response.document?.userName}
          </h2>
          <h3>{postData.location}</h3>
        </div>
      </div>

      <button className="btn btn--options" onClick={() => setShowOptions(true)}>
        <FiMoreHorizontal size={20} />
      </button>
    </header>
  );
};

export default PostHeader;
