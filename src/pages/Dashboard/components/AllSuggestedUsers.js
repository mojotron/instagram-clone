// hooks
import { useNavigate } from 'react-router-dom';
import { useFollow } from '../../../hooks/useFollow';
import { useSuggestedUsersContext } from '../../../hooks/useSuggestedUsersContext';
// components
import Avatar from '../../../components/Avatar';
// style
import './styles/AllSuggestedUsers.css';

const AllSuggestedUsers = () => {
  const { notFollowingBack, followersFollowings } = useSuggestedUsersContext();
  const { follow } = useFollow();
  const navigate = useNavigate();

  return (
    <div className="AllSuggestedUsers">
      <h2 className="AllSuggestedUsers__heading">Suggested</h2>
      {[...notFollowingBack, ...followersFollowings].map(doc => (
        <div key={doc.userName} className="AllSuggestedUsers__user">
          <div className="AllSuggestedUsers__user__left">
            <Avatar
              url={doc.avatar.url}
              size={50}
              handleClick={() => navigate(`/${doc.userName}`)}
            />
            <div className="AllSuggestedUsers__user__left__info">
              <h2 onClick={() => navigate(`/${doc.userName}`)}>
                {doc.userName}
              </h2>
              <h3>{doc.fullName}</h3>
              {!doc.suggestedBy && <p>Follows you</p>}
              {doc.suggestedBy && (
                <p>
                  Followed by{' '}
                  {
                    doc.suggestedBy[
                      Math.floor(Math.random(doc.suggestedBy.length - 1))
                    ]
                  }
                  {doc.suggestedBy.length > 1
                    ? ` + ${doc.suggestedBy.length - 1}`
                    : ''}
                </p>
              )}
            </div>
          </div>
          <button
            className="btn btn--follow"
            onClick={() => follow(doc.id, doc.followers)}
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllSuggestedUsers;
