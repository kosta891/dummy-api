import React from 'react';
import { useEffect, useState } from 'react';
import { rootUrl, useGlobalContext } from '../../context/context';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import axios from 'axios';
import './Forms.scss';

axios.defaults.headers.common['app-id'] = process.env.REACT_APP_API_ID;

const UpdatePost = () => {
  const { id } = useParams();
  const {
    singlePost: { text, image, link },
    setId,
    setSinglePost,
    isLoading,
  } = useGlobalContext();

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  const [message, setMessage] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [updatedLink, setUpdatedLink] = useState(link);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const singlePost = {
      image: updatedImage || image,
      link: updatedLink || link,
      text: updatedText || text,
      id: id,
      // publishDate: new Date().toISOString(),
    };

    //axios
    const res = await axios.put(`${rootUrl}/post/${id}`, singlePost);
    setSinglePost(res.data);
    setMessage(true);
  };

  return (
    <section className='single-post'>
      <h1>Update Post</h1>
      <form onSubmit={handleUpdate} className='flex-form' action=''>
        <div>
          <label htmlFor='image'>Main image</label>
          <input
            onChange={(e) => setUpdatedImage(e.target.value)}
            id='image'
            value={updatedImage}
            type='text'
          />
        </div>
        <div>
          <label htmlFor='link'>Image resource</label>
          <input
            onChange={(e) => setUpdatedLink(e.target.value)}
            id='link'
            value={updatedLink}
          />
        </div>

        <div>
          <label htmlFor='text'>Text </label>
          <textarea
            onChange={(e) => setUpdatedText(e.target.value)}
            value={updatedText}
            id='text'
            rows='10'
          ></textarea>
        </div>

        {message && <h3>You successfully update post!</h3>}
        <div>
          <button onClick={handleUpdate} className='button-2'>
            save
          </button>
          <Link className='button-2' to={`/${id}`}>
            back
          </Link>
        </div>
      </form>
    </section>
  );
};

export default UpdatePost;
