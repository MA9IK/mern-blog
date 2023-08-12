import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function register(ev) {
    ev.preventDefault();
    const respone = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!respone.ok) {
      alert('Something went wrong');
    } else {
      alert('Success');
    }
  }

  return (
    <div>
      <form className='register-form' onSubmit={register}>
        <h1>Register</h1>
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
        <button type='submit'>Register</button>

        <Link to='/login'>Already have an account?</Link>
      </form>
    </div>
  );
};

export default LoginPage;
