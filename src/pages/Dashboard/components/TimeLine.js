import TimeLinePost from '../../Post/TimeLinePost';

const TimeLine = ({ documents, isPending, error }) => {
  return (
    <div
      className="Timeline"
      style={{
        padding: '2rem 0',
      }}
    >
      {documents?.length === 0 && !error && (
        <div className="welcome">
          <h3>Welcome to Instagram Clone</h3>
          <p>
            This project is created by{' '}
            <a
              href="https://github.com/mojotron"
              target="_blank"
              rel="noopener noreferrer"
            >
              @mojotron
            </a>
            . Goal of this project is learning frontend development. If you find
            bug or you have suggestion or advice feel free to contact me.
          </p>
          <p>Start using app by adding a post or search for other users!</p>
          <p>Have fun and thank you for inspecting this project.</p>
        </div>
      )}
      {documents &&
        documents.map((post, i) => <TimeLinePost key={i} postData={post} />)}

      {isPending && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TimeLine;
