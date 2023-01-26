// hooks
import { useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// style
import './styles/TimeLinePostCommentsList.css';
// components
import TimeLinePostComment from './TimeLinePostComment';

const TimeLinePostCommentsList = ({ postData }) => {
  const { response } = useUserDataContext();
  const navigate = useNavigate();

  const commentsCount = postData.comments.length;

  const yourComments = postData.comments.filter(comment => {
    const match =
      comment.userName === response.document.userName ||
      comment.text.indexOf(`@${response.document.userName}`);

    return match !== -1;
  });

  return (
    <div className="TimeLinePostCommentsList">
      {/* caption */}
      {postData.caption !== '' && (
        <TimeLinePostComment
          data={{ userName: postData.creator.userName, text: postData.caption }}
        />
      )}
      {!postData.disableComments && commentsCount > 0 && (
        <button
          className="btn btn--comments-count"
          onClick={() => navigate(`/p/${postData.id}`)}
        >
          View{' '}
          {commentsCount === 1 ? 'comment' : `all ${commentsCount} comments`}
        </button>
      )}
      {/* comments => display only comments current user made for all comments link to post*/}
      {!postData.disableComments &&
        yourComments.map(comment => (
          <TimeLinePostComment
            key={comment.createdAt.seconds}
            data={{ userName: comment.userName, text: comment.text }}
          />
        ))}
    </div>
  );
};

export default TimeLinePostCommentsList;
