import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section>
      <h1>ErrorPage</h1>

      <Link className='button-2' to='/'>
        Home
      </Link>
    </section>
  );
};

export default ErrorPage;
