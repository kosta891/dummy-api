import { useEffect, useState } from 'react/cjs/react.development';
import PostList from '../components/Posts/PostList';
import { useGlobalContext } from '../context/context';

const MainPage = () => {
  const { fetchAllPosts } = useGlobalContext();
  const [run, setRun] = useState(true);

  useEffect(() => {
    fetchAllPosts();
    setRun(false);
  }, [run]);
  return <PostList />;
};

export default MainPage;
