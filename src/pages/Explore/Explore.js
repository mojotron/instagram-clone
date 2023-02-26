// hooks
import { useState, useEffect, useRef } from 'react';
import { useCollectPostsWithLimit } from '../../hooks/useCollectPostsWithLimit';
// styles
import './styles/Explore.css';
// components
import PostCard from '../Profile/components/PostCard';

const Explore = () => {
  const { getNextPosts } = useCollectPostsWithLimit(6);
  const [posts, setPosts] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    if (posts.length > 0) return;

    getNextPosts().then(data => {
      if (data !== -1) {
        setPosts(data);
      }
    });
  }, [getNextPosts, posts]);

  const handleScroll = () => {
    const triggerHeight =
      containerRef.current.offsetHeight + containerRef.current.scrollTop;
    if (triggerHeight >= containerRef.current.scrollHeight) {
      getNextPosts().then(data => {
        if (data !== -1) {
          setPosts(oldValue => [...oldValue, ...data]);
        }
      });
    }
  };

  return (
    <div className="Explore" ref={containerRef} onScroll={handleScroll}>
      <div className="Explore__posts">
        {posts.map(post => (
          <PostCard key={post.id} data={post} dimensions={post.dimensions} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
