import { useEffect, useState } from 'react/cjs/react.development';
import PostList from '../components/Posts/PostList';
import { useGlobalContext } from '../context/context';

const MainPage = () => {
  const { fetchAllPosts } = useGlobalContext();
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    fetchAllPosts();
    setRerender(false);
  }, [rerender]);
  return <PostList />;
};

export default MainPage;
