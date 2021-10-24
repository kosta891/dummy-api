import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

axios.defaults.headers.common['app-id'] = process.env.REACT_APP_API_ID;

export const rootUrl = 'https://dummyapi.io/data/v1';
const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  // list of posts
  const [posts, setPosts] = useState([]);
  // page for fetching
  const [page, setPage] = useState(null);
  // single post detail
  const [singlePost, setSinglePost] = useState([]);

  // comments for post
  const [comments, setComments] = useState([]);

  // id for single post
  const [id, setId] = useState('');

  // tags
  const [tag, setTag] = useState([]);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // fetching single post and comments for single post
  const fetchingPostAndComments = async () => {
    setSinglePost([]);
    setIsLoading(true);

    try {
      if (id) {
        const post = await axios(`${rootUrl}/post/${id}`);

        const comment = await axios(`${rootUrl}/post/${id}/comment`);

        const { data } = comment.data;
        const singlePost = await post.data;

        setSinglePost(singlePost);
        setComments(data);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  // fetching initial posts
  const fetchAllPosts = async () => {
    setIsLoading(true);
    setPosts([]);
    setPage(0);

    if (!page) {
      try {
        const response = await axios(`${rootUrl}/post`);

        const { data } = response;
        setPosts(data.data);
        setPage(1);
      } catch (error) {
        console.log(error);
      }
    }

    setIsLoading(false);
  };

  const tagUrl = `${rootUrl}/tag/${tag}/post`;

  const fetchMorePages = async () => {
    try {
      if (tag.length > 0) {
        const response = await axios(`${tagUrl}?page=${page}`);
        const { data } = response;
        setPosts((prevData) => [...prevData, ...data.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        const response = await axios(`${rootUrl}/post?page=${page}`);
        const { data } = await response;
        setPosts((prevData) => [...prevData, ...data.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostByTag = async () => {
    setIsLoading(true);
    setPosts([]);
    if (tag.length > 0) {
      try {
        const response = await axios(tagUrl);
        const { data } = await response;

        setPosts(data.data);
        setPage(1);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchingPostAndComments();
  }, [id]);

  useEffect(() => {
    fetchPostByTag();
  }, [tag]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setId,
        singlePost,
        comments,
        isLoading,
        fetchAllPosts,
        fetchMorePages,
        setSinglePost,
        setTag,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(PostsContext);
};

//
