// style
import './styles/FollowerList.css';
// icons
import { GrClose } from 'react-icons/gr';
// components
import FollowItem from './FollowItem';
// hooks
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';

const FollowerList = ({ type, userIdList, closeHandler }) => {
  const { documents } = useCollectDocsByIdList(userIdList, 'users');

  return (
    <div className="overlay">
      <div className="FollowerList">
        <header className="FollowerList__header">
          <h2>{type}</h2>
          <button className="btn" onClick={closeHandler}>
            <GrClose size={20} />
          </button>
        </header>
        <section>
          {documents &&
            documents.map(ele => (
              <FollowItem key={ele.id} type={type} userData={ele} />
            ))}
        </section>
      </div>
    </div>
  );
};

export default FollowerList;
