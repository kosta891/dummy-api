import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { rootUrl } from '../../context/context';
import './Forms.scss';

const CreatePost = () => {
  const [message, setMessage] = useState(false);
  const owner = useRef();

  const image = useRef();
  const text = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerInput = owner.current.value;
    const imageInput = image.current.value;
    const textInput = text.current.value;

    const createObj = {
      text: textInput,
      owner: ownerInput,
      image: imageInput,
    };

    const res = await axios.post(`${rootUrl}/post/create`, createObj);
    console.log(res);
    setMessage(true);
  };

  return (
    <section className='single-post'>
      <h1>Create Post</h1>
      <Link className='button-2' to={`/`}>
        back
      </Link>
      <form onSubmit={handleSubmit} className='flex-form' action=''>
        <div>
          <label>Owner</label>
          <input ref={owner} type='text' />
        </div>

        <div>
          <label htmlFor='image'>Main image</label>
          <input required ref={image} type='text' />
        </div>

        <div>
          <label htmlFor='text'>Text </label>
          <textarea ref={text}></textarea>
        </div>
        {message && <h3>You successifully created post!</h3>}
        <div>
          <button type='submit' className='button-2'>
            save
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
