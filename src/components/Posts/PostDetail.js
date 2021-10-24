import { Link } from 'react-router-dom';
import './PostDetail.scss';
const PostDetail = ({ post }) => {
  const {
    id,
    text,
    publishDate,
    image,
    owner: { firstName, lastName, picture },
    tags,
  } = post;

  const singleTag = tags.map((tag, inx) => (
    <Link className='button' to={`/tag/${tag}/post`} key={inx}>
      {tag}
    </Link>
  ));

  const formatedDate = new Date(publishDate).toLocaleDateString('SR-RS', {
    month: '2-digit',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return (
    <article className='article'>
      <div className='avatar-info'>
        <img
          className='avatar-image'
          src={picture}
          alt={`${firstName} ${lastName}`}
        />
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div className='article-info'>
        <div>
          <img className='image' src={image} alt='post' />
        </div>
        <h3>{text}</h3>

        <p>{formatedDate}</p>
        <p>
          {firstName} {lastName}
        </p>

        <p className='tag'>{singleTag}</p>
        <div>
          <Link className='button detail' to={`/${id}`}>
            more details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
