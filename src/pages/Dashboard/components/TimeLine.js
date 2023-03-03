import TimeLinePost from '../../Post/TimeLinePost';
import WelcomeMessage from './WelcomeMessage';

const TimeLine = ({ posts, isFetching, error }) => {
  console.log('post got', posts);
  return (
    <div
      className="Timeline"
      style={{
        padding: '2rem 0',
      }}
    >
      {posts?.length === 0 && !error && (
        <WelcomeMessage headingText="Welcome to Instagram Clone" />
      )}
      {posts && posts.map((post, i) => <TimeLinePost key={i} postId={post} />)}

      {isFetching && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TimeLine;
