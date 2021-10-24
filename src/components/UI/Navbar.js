import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <header className='header'>
      <nav className='nav'>
        <div className='logo'>
          <h2>
            <Link to='/'>Posts</Link>
          </h2>
        </div>
        <div className='links'>
          <Link className='button' to='/create'>
            Create
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
