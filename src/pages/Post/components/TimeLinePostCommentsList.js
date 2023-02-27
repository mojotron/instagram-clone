// hooks
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// style
import './styles/TimeLinePostCommentsList.css';
// components
import TimeLinePostComment from './TimeLinePostComment';

const TimeLinePostCommentsList = ({ postData }) => {
  const { response } = useUserDataContext();
  const navigate = useNavigate();

  const commentsCount = postData.comments.length;

  const yourComments = useMemo(() => {
    const comments = postData.comments.filter(comment => {
      const match =
        comment.userID === response.document.id ||
        comment.text.indexOf(`@${response.document.userName}`);

      return match !== -1;
    });

    return {
      comments: comments,
      userMentionYou: [
        ...new Set(
          comments
            .map(comment => comment.userID)
            .filter(id => id !== response.document.id)
        ),
      ],
    };
  }, [postData.comments, response.document.id, response.document.userName]);

  const { documents } = useCollectDocsByIdList(
    yourComments?.userMentionYou,
    'users'
  );

  // console.log(yourComments);

  return (
    <div className="TimeLinePostCommentsList">
      {/* caption */}
      {postData.caption !== '' && (
        <TimeLinePostComment
          // data={{ userName: postData.creator.userName, text: postData.caption }}
          text={postData.caption}
          userName={
            postData.creator === response.document.id
              ? response.document.userName
              : documents?.find(user => user.id === postData.creator).userName
          }
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
        yourComments?.comments.map(comment => (
          <TimeLinePostComment
            text={comment.text}
            key={comment.createdAt.seconds}
            userName={
              comment.userID === response.document.id
                ? response.document.userName
                : documents?.find(user => user.id === comment.userID).userName
            }
            // commentData={comment}
            // userData={
            //   comment.userID === response.document.id
            //     ? response.document
            //     : documents?.find(user => user.id === comment.userID)
            // }
          />
        ))}
    </div>
  );
};

export default TimeLinePostCommentsList;
