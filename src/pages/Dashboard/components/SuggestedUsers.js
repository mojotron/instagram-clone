// hooks
import { useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useFollow } from '../../../hooks/useFollow';
import { useSuggestedUsersContext } from '../../../hooks/useSuggestedUsersContext';
// style
import './styles/SuggestedUsers.css';
// components
import Avatar from '../../../components/Avatar';

const SuggestedUsers = () => {
  const { response } = useUserDataContext();
  const { notFollowingBack, followersFollowings } = useSuggestedUsersContext();

  const { follow } = useFollow();
  const navigate = useNavigate();

  return (
    <div className="SuggestedUsers">
      <header className="SuggestedUsers__header">
        <div className="SuggestedUsers__header__info">
          <Avatar
            url={response.document.avatar.url}
            size={50}
            handleClick={() => navigate(`/${response.document.userName}`)}
          />
          <h3 onClick={() => navigate(`/${response.document.userName}`)}>
            {response.document.userName}
          </h3>
        </div>
        <button className="btn btn--blue">Switch</button>
      </header>

      <div className="SuggestedUsers__heading">
        <h2>Suggestions for you</h2>
        <button className="btn" onClick={() => navigate('/explore/people')}>
          See All
        </button>
      </div>

      <div className="SuggestedUsers__users">
        {notFollowingBack.length === 0 && followersFollowings.length === 0 && (
          <p className="SuggestedUsers__users__not">
            No suggestions yet. Search for friends, or explore posts to find
            accounts to follow!
          </p>
        )}
        {[...notFollowingBack, ...followersFollowings].slice(0, 5).map(doc => (
          <div key={doc.userName} className="Suggestion">
            <div className="Suggestion__left">
              <Avatar
                url={doc.avatar.url}
                size={35}
                handleClick={() => navigate(`/${doc.userName}`)}
              />
              <div className="Suggestion__left__info">
                <h2 onClick={() => navigate(`/${doc.userName}`)}>
                  {doc.userName}
                </h2>
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
              className="btn btn--blue"
              onClick={() => follow(doc.id, doc.followers)}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
