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

  // const getDocs = useRef(async () => {
  //   const response = await getSuggestedUsersDocuments();
  //   console.log(response);
  //   setNotFollowingBack(response.notFollowingBack);
  //   setSuggestedUsers(response.suggestedUsers);
  // }).current;

  useEffect(() => {
    if (documents) return;
    getSuggestedUsersDocuments();
  }, [getSuggestedUsersDocuments, documents]);

  console.log(documents);

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
        <p className="SuggestedUsers__users__not">
          No suggestions yet. Search for friends, or explore posts to find
          accounts to follow!
        </p>
      </div>
    </div>
  );
};

export default SuggestedUsers;
