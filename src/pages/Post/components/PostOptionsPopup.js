import { useNavigate } from 'react-router-dom';

const PostOptionsPopup = ({ owner, postData, handlers, isFollowing }) => {
  const navigate = useNavigate();

  return (
    <div className="child-overlay">
      <div className="DiscardPost">
        {/* TODO follow unfollow */}
        {owner && (
          <button
            onClick={async () => {
              await handlers.deletePost();
              navigate(`/${postData.creator.userName}`);
            }}
            className="btn discard"
            style={{ border: 'none' }}
          >
            Delete
          </button>
        )}
        {owner && (
          <button
            onClick={() => {
              handlers.openEdit(true);
              handlers.close();
            }}
            className="btn"
          >
            Edit
          </button>
        )}
        {owner && (
          <button onClick={() => handlers.displayLikes()} className="btn">
            {postData.disableLikes ? 'Show' : 'Hide'} Like count
          </button>
        )}
        {owner && (
          <button onClick={() => handlers.disableComments()} className="btn">
            Turn {postData.disableComments ? 'on' : 'off'} commenting
          </button>
        )}

        {!owner && isFollowing && (
          <button
            onClick={() => handlers.unfollow()}
            className="btn discard"
            style={{ border: 'none' }}
          >
            Unfollow
          </button>
        )}

        {!owner && !isFollowing && (
          <button
            onClick={() => handlers.follow()}
            className="btn discard"
            style={{ border: 'none' }}
          >
            Follow
          </button>
        )}

        <button className="btn">Share to...</button>
        <button
          onClick={() => navigate(`/${postData.creator.userName}`)}
          className="btn"
        >
          Go to profile
        </button>
        <button onClick={() => handlers.close()} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostOptionsPopup;
