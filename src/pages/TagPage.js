import React from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import PostList from '../components/Posts/PostList';
import { useGlobalContext } from '../context/context';

const TagPage = () => {
  const { setTag } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    setTag(id);
  }, [id]);

  return <PostList />;
};

export default TagPage;
