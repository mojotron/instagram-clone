// hooks
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';
// components
import PostCard from './PostCard';

const PostsCollectionTab = ({ collectionType, targetData }) => {
  const determineList = () => {
    if (collectionType === 'posts') return targetData.posts;
    if (collectionType === 'saved') return targetData.savedPosts;
  };

  const { documents, isPending, error } = useCollectDocsByIdList(
    determineList(),
    'posts'
  );

  return (
    <div className="ProfileCollectionTab">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {documents &&
        documents
          .reverse()
          .map(post => (
            <PostCard key={post.id} data={post} dimensions={post.dimensions} />
          ))}
    </div>
  );
};

export default PostsCollectionTab;
