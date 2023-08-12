import { useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      credentials: 'include'
    }).then(res => {
      res.json().then(data => {
        setUser(data);
      });
    });
  }, []);

  async function logout() {
    try {
      await fetch('http://localhost:5000/logout', {
        credentials: 'include',
        method: 'POST'
      });
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  const username = user?.username;

  return (
    <header>
      <Link to={'/'} className='logo'>
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to={'/create'}>Create Post</Link>
            <Link onClick={logout}>Logout</Link>
            <a>Welcome, {username}</a>
          </>
        )}
        {!username && (
          <>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
          </>
        )}
        {/* <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link> */}
      </nav>
    </header>
  );
};

export default Header;
