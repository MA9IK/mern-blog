import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const { errors } = data;
    setErrors(errors); // Update the errors state
  }

  function showError(path) {
    if (errors) {
      return errors.map((error, index) => {
        if (error.path === path) {
          return (
            <div
              style={{
                color: 'red',
                fontSize: '12px'
              }}
              key={index}>
              {error.msg}
            </div>
          );
        }
        return null;
      });
    } else {
      return (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 300,
              bgcolor: 'background.paper',
              // border: '2px solid #000',
              boxShadow: 24,
              p: 4
            }}>
            <Typography
              // id='modal-modal-description'
              sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 200 }} />
            </Typography>
            <Typography
              variant='h6'
              component='h2'
              sx={{
                textAlign: 'center',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)'
              }}>
              You can now{' '}
              <Link
                to='/login'
                style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Modal>
      );
    }
  }

  return (
    <div>
      <form className='register-form' onSubmit={register}>
        <h1>Register</h1>
        {showError('username')}
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {showError('password')}
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit' onClick={handleOpen}>
          Register
        </button>
        <Link to='/login'>Already have an account?</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
