import TimeLinePost from '../../Post/TimeLinePost';

const TimeLine = ({ posts }) => {
  return (
    <div>
      {posts.map((post, i) => (
        <TimeLinePost key={i} postData={post} />
      ))}
    </div>
  );
};

export default TimeLine;
