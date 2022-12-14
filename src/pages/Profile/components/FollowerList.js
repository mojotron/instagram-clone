import './styles/FollowerList.css';
import closeIcon from '../../../images/close-icon.svg';
import { useCollectUsers } from '../../../hooks/useCollectUsers';
import FollowItem from './FollowItem';

const FollowerList = ({ type, targetList, closeHandler, followHandlers }) => {
  const { documents } = useCollectUsers(targetList);
  console.log(documents);

  return (
    <div className="overlay">
      <div className="FollowerList">
        <header className="FollowerList__header">
          <h2>{type}</h2>
          <button className="btn" onClick={closeHandler}>
            <img src={closeIcon} alt="close follower list" />
          </button>
        </header>
        <section>
          {documents &&
            documents.map(ele => (
              <FollowItem
                type={type}
                key={ele.id}
                userData={ele}
                followHandlers={followHandlers}
              />
            ))}
        </section>
      </div>
    </div>
  );
};

export default FollowerList;
