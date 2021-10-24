import InfiniteScroll from 'react-infinite-scroll-component';

import { useGlobalContext } from '../../context/context';
import PostDetail from './PostDetail';
import LoadingSpinner from '../UI/LoadingSpinner';

import './PostList.scss';

const PostList = () => {
  const { posts, isLoading, fetchMorePages } = useGlobalContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMorePages}
      hasMore={true}
      hasChildren={true}
      loader={<LoadingSpinner />}
      style={{ overflow: 'hidden' }}
      endMessage='No more data'
    >
      <section className='posts'>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => {
            return <PostDetail key={post.id} post={post} />;
          })}
      </section>
    </InfiniteScroll>
  );
};

export default PostList;
