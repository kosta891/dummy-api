import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';

import { useGlobalContext } from '../../context/context';
import CreateComment from '../Comments/Comment';
import LoadingSpinner from '../UI/LoadingSpinner';

import './SinglePost.scss';

const SinglePost = () => {
  const { id } = useParams();

  const {
    singlePost: { image, likes, link, publishDate, text },
    setId,
    isLoading,
  } = useGlobalContext();

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const formatedDate = new Date(publishDate).toLocaleDateString('SR-RS', {
    month: '2-digit',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return (
    !isLoading && (
      <div className='single-post'>
        <section className='posts single'>
          <div className='post-image'>
            <img className='image' src={image} alt='post' />
          </div>
          <div className='single-info'>
            <p>{formatedDate}</p>
            <p>
              <AiFillLike />
              {likes}
            </p>
            <p>
              {link && (
                <a
                  className='button'
                  rel='noreferrer'
                  target='_blank'
                  href={link}
                >
                  to image link
                </a>
              )}
            </p>

            <h3>{text}</h3>

            <Link className='button detail' to={`${id}/edit`}>
              edit
            </Link>
          </div>
        </section>

        <CreateComment />
      </div>
    )
  );
};

export default SinglePost;
