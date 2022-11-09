import { useNavigate } from 'react-router-dom';

const PostOptionsPopup = ({ userName, owner, postData, handlers }) => {
  const navigate = useNavigate();

  return (
    <div className="child-overlay">
      <div className="DiscardPost">
        {/* TODO follow unfollow */}
        {owner && (
          <button
            onClick={async () => {
              await handlers.deletePost();
              navigate(`/${userName}`);
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

        <button className="btn">Share to...</button>
        <button className="btn">Go to post</button>
        <button onClick={() => handlers.close()} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostOptionsPopup;
