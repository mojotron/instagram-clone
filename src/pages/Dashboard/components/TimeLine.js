import TimeLinePost from '../../Post/TimeLinePost';

const TimeLine = ({ documents }) => {
  return (
    <div
      className="TimeLine"
      style={{
        padding: '2rem 0',
      }}
    >
      {documents &&
        documents.map((post, i) => <TimeLinePost key={i} postData={post} />)}
    </div>
  );
};

export default TimeLine;
