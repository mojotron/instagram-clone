import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollectSuggestedUsers } from '../../../hooks/useCollectSuggestedUsers';
import { useTimeLinePostHandlers } from '../../../hooks/useTimeLinePostHandlers';
import Avatar from '../../../components/Avatar';
import './styles/AllSuggestedUsers.css';

const AllSuggestedUsers = () => {
  const { documents, getSuggestedUsersDocuments } = useCollectSuggestedUsers();
  const { followProfile } = useTimeLinePostHandlers();
  const navigate = useNavigate();

  useEffect(() => {
    if (documents) return;
    getSuggestedUsersDocuments();
  }, [getSuggestedUsersDocuments, documents]);

  return (
    <div className="AllSuggestedUsers">
      <h2 className="AllSuggestedUsers__heading">Suggested</h2>
      {documents &&
        documents.map(doc => (
          <div key={doc.userName} className="AllSuggestedUsers__user">
            <div className="AllSuggestedUsers__user__left">
              <Avatar
                url={doc.avatar.url}
                size="mid-3"
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
              onClick={() => followProfile(doc.uid, doc.followers, doc.id)}
            >
              Follow
            </button>
          </div>
        ))}
    </div>
  );
};

export default AllSuggestedUsers;
