import { useState, useEffect, useRef } from 'react';
// styles
import './styles/Explore.css';
// hooks
import { useCollectPostsWithLimit } from '../../hooks/useCollectPostsWithLimit';
// components
import PostCard from '../Profile/components/PostCard';

const Explore = () => {
  const { getNextPosts } = useCollectPostsWithLimit();
  const [posts, setPosts] = useState([]);
  const containerRef = useRef();

  console.log(posts);

  useEffect(() => {
    console.log('try to catch');
    if (posts.length > 0) return;
    console.log('catching');
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
      console.log('LOUNCH');
      getNextPosts().then(data => {
        if (data !== -1) {
          setPosts(oldValue => [...oldValue, ...data]);
        }
      });
    }
  };

  return (
    <div className="Explore">
      <div
        ref={containerRef}
        className="Explore__posts"
        onScroll={handleScroll}
      >
        {posts.map(post => (
          <PostCard key={post.id} data={post} dimensions={post.dimensions} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
