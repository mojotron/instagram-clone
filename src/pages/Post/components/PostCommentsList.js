import './styles/PostCommentsList.css';
import PostComment from './PostComment';

const tempText = `
This is temp comment. Bla bla bla bla. This is temp comment. Bla bla bla bla. This is temp comment. Bla bla bla bla. 
.
. 
Multiline
`;

const PostCommentsList = () => {
  return (
    <div className="PostCommentsList">
      <PostComment
        avatarUrl=""
        userName="temp_user"
        text={tempText}
        createdAt="3 day ago"
      />
      {/* comments */}
      <PostComment
        avatarUrl=""
        userName="temp_user"
        text={tempText}
        createdAt="3 day ago"
      />
      <PostComment
        avatarUrl=""
        userName="temp_user"
        text={tempText}
        createdAt="3 day ago"
      />
      <PostComment
        avatarUrl=""
        userName="temp_user"
        text={tempText}
        createdAt="3 day ago"
      />
      <PostComment
        avatarUrl=""
        userName="temp_user"
        text={tempText}
        createdAt="3 day ago"
      />
      <PostComment
        avatarUrl=""
        userName="temp_user"
        text={tempText}
        createdAt="3 day ago"
      />
    </div>
  );
};

export default PostCommentsList;
