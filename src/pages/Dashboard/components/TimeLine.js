import TimeLinePost from '../../Post/TimeLinePost';

import { useCollectTimeLinePosts } from '../../../hooks/useCollectTimeLinePosts';

const TimeLine = ({ posts }) => {
  const { documents } = useCollectTimeLinePosts();

  return (
    <div>
      {documents &&
        documents.map((post, i) => <TimeLinePost key={i} postData={post} />)}
    </div>
  );
};

export default TimeLine;
