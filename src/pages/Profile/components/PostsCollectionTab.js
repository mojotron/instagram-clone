// hooks
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';
// components
import PostCard from './PostCard';

const PostsCollectionTab = ({ collectionType, targetData }) => {
  console.log(targetData.posts);

  const determineList = () => {
    if (collectionType === 'posts') return targetData.posts;
    if (collectionType === 'saved') return targetData.savedPosts;
  };

  // to do snapshot collection
  const { documents, isPending, error } = useCollectDocsByIdList(
    collectionType === 'posts' ? targetData.posts : targetData.savedPosts,
    'posts'
  );

  return (
    <div className="ProfileCollectionTab">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {documents &&
        documents.map(post => (
          <PostCard key={post.id} data={post} dimensions={post.dimensions} />
        ))}
    </div>
  );
};

export default PostsCollectionTab;
