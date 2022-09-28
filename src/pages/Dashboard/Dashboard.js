import { useRef } from 'react';
// hooks
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
// components
import Header from './components/Header';
import { useEffect } from 'react';

const Dashboard = () => {
  // get data
  const { user } = useAuthContext();
  const { response, getDocument } = useFirestore('users');

  console.log(user.uid);

  const loadDocument = useRef(() => getDocument(user.uid)).current;

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  return (
    <div>{response.document && <Header userData={response.document} />}</div>
  );
};

export default Dashboard;
