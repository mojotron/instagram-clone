import React from 'react';
import './styles/MessagesHeader.css';
//
import { BiEdit } from 'react-icons/bi';
//
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const MessagesHeader = ({ setShowNewMessage }) => {
  const { response } = useUserDataContext();

  return (
    <header className="MessagesHeader">
      <h2>{response.document.userName}</h2>

      <button className="btn" onClick={() => setShowNewMessage(true)}>
        <BiEdit size={25} />
      </button>
    </header>
  );
};

export default MessagesHeader;
