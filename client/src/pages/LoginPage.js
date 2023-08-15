import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { user, setUser } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const data = await response.json();
    const { error } = data;
    setErrors(error);

    if (!error) {
      setUser(data);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  function showError() {
    if (errors) {
      return (
        <div
          style={{
            color: 'red',
            fontSize: '12px'
          }}>
          {errors}
        </div>
      );
    }
  }

  return (
    <div>
      <form className='login-form' onSubmit={login}>
        <h1>Login</h1>
        {showError()}
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>

        <Link to='/register'>Don't have an account?</Link>
      </form>
    </div>
  );
};

export default LoginPage;
