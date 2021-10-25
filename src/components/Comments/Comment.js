import { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import './Comments.scss';

const CreateComment = () => {
  // global state
  const { comments } = useGlobalContext();

  //local state testing
  const [newCommentInput, setNewCommentInput] = useState('');
  const [error, setError] = useState({ status: false, message: '' });
  const [newComment, setNewComment] = useState([]);

  const submitComment = (e) => {
    e.preventDefault();

    if (newCommentInput.trim().length === 0) {
      setError({ status: true, message: 'Please write something...' });
      return;
    } else {
      setNewComment([...newComment, newCommentInput.trim()]);
    }
    setError({ status: false });
  };

  return (
    <section className=''>
      <h2>Comments...</h2>
      {comments &&
        comments.map(({ message, publishDate, id, owner }) => {
          const formatedDate = new Date(publishDate).toLocaleDateString(
            'SR-RS',
            {
              month: '2-digit',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }
          );
          return (
            <section key={id}>
              <div className='avatar-info-comment'>
                <img
                  className='avatar-image'
                  src={owner.picture}
                  alt={`${owner.firstName} ${owner.lastName}`}
                />
                <p>
                  {owner.firstName} {owner.lastName}
                </p>
                <p>{formatedDate}</p>
              </div>

              <h3 className='comment-info'>{message}</h3>
            </section>
          );
        })}
      {comments.length === 0 && newComment.length === 0 && (
        <h3 className='avatar-info-comment'>
          This post has no comments, be first to comment post
        </h3>
      )}

      {newComment &&
        newComment.map((comment, inx) => (
          <div className='avatar-info-comment' key={inx}>
            <h3 className='comment-info'>{comment}</h3>
          </div>
        ))}

      {error.status && newCommentInput.trim().length === 0 && (
        <h3 className='error'>{error.message}</h3>
      )}

      <form className='form-comment' onSubmit={submitComment}>
        <textarea
          onChange={(e) => setNewCommentInput(e.target.value)}
          value={newCommentInput}
          cols='25'
          rows='5'
          maxLength='60'
          placeholder='Write comment...'
        ></textarea>

        <button className='button'>Submit</button>
      </form>
    </section>
  );
};

export default CreateComment;
