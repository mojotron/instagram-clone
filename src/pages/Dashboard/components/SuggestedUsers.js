import './styles/SuggestedUsers.css';
// components
import Avatar from '../../../components/Avatar';
// hooks
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useCollectSuggestedUsers } from '../../../hooks/useCollectSuggestedUsers';
import { useEffect, useState, useRef } from 'react';

const SuggestedUsers = () => {
  const { response } = useUserDataContext();
  const { documents, getSuggestedUsersDocuments } = useCollectSuggestedUsers();

  useEffect(() => {
    if (documents) return;
    getSuggestedUsersDocuments();
  }, [getSuggestedUsersDocuments, documents]);

  console.log(documents);

  // todo when follow user set documents to null
  // link avatar and name to profile
  // follow user, reset document recall method

  return (
    <div className="SuggestedUsers">
      <header className="SuggestedUsers__header">
        <div className="SuggestedUsers__header__info">
          <Avatar url={response.document.avatar.url} size="mid-3" />
          <h3>{response.document.userName}</h3>
        </div>
        <button className="btn btn--blue">Switch</button>
      </header>

      <div className="SuggestedUsers__heading">
        <h2>Suggestions for you</h2>
        <button className="btn">See All</button>
      </div>

      <div className="SuggestedUsers__users">
        {!documents && (
          <p className="SuggestedUsers__users__not">
            No suggestions yet. Search for friends, or explore posts to find
            accounts to follow!
          </p>
        )}
        {documents &&
          documents.slice(0, 5).map(doc => (
            <div key={doc.userName} className="Suggestion">
              <div className="Suggestion__left">
                <Avatar url={doc.avatar.url} size="mid" />
                <div className="Suggestion__left__info">
                  <h2>{doc.userName}</h2>
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
              <button className="btn btn--blue">Follow</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
