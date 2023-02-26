import TimeLinePost from '../../Post/TimeLinePost';

const TimeLine = ({ documents, isPending, error }) => {
  return (
    <div
      className="TimeLine"
      style={{
        padding: '2rem 0',
      }}
    >
      {documents &&
        documents.map((post, i) => <TimeLinePost key={i} postData={post} />)}

      {isPending && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TimeLine;
