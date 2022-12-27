import { useEffect, useState, useRef } from 'react';
import { formatTime } from '../../../utils/formatTime';
// components
import Avatar from '../../../components/Avatar';
import PostImage from '../../../components/PostImage';
// styles
import './styles/Notification.css';
// hooks
import { useFirestore } from '../../../hooks/useFirestore';
const Notification = ({ data }) => {
  const [isReady, setIsReady] = useState(false);

  const { response: userResponse, getDocumentById: getUser } =
    useFirestore('users');
  const { response: postResponse, getDocumentById: getPost } =
    useFirestore('posts');

  const getUserRef = useRef(id => getUser(id)).current;
  const getPostRef = useRef(id => getPost(id)).current;

  useEffect(() => {
    console.log('called single notification useEffect');
    if (isReady) return;

    const getData = async () => {
      try {
        await getUserRef(data.userId);
        await getPostRef(data.postId);
        setIsReady(true);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [data, getUserRef, getPostRef, isReady]);

  if (!isReady) return;

  return (
    <div className="Notification">
      <div className="Notification__content">
        <Avatar url={userResponse.document.avatar.url} size="mid" />
        <p>
          <span className="Notification__content__username">
            {userResponse.document.userName}
          </span>{' '}
          {data.content}{' '}
          <span className="Notification__content__created-at">
            {formatTime(data.createdAt)}
          </span>
        </p>
      </div>
      <div className="Notification__post">
        <PostImage
          imagesData={postResponse.document.images}
          dimensions={postResponse.document.dimensions}
        />
      </div>
    </div>
  );
};

export default Notification;
