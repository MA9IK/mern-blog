import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link, Navigate } from 'react-router-dom';
import Editor from '../components/Editor';
import { Box, Modal, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState([]);
  const [authError, setAuthError] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files);
    ev.preventDefault();

    const response = await fetch('http://localhost:5000/post', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    if (response.ok) {
      setRedirect(true);
    }

    const info = await response.json();
    const { errors, error } = info;
    if (errors) {
      setErrors(errors);
    } else {
      setAuthError(error);
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
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
    }
  }

  function showAuthError() {
    if (authError) {
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
              boxShadow: 24,
              p: 4
            }}>
            <Typography
              sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
              <HighlightOffIcon sx={{ fontSize: 200 }} />
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
              {authError}
              <Link
                to='/register'
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}>
                <br />
                Make an account
              </Link>
            </Typography>
          </Box>
        </Modal>
      );
    }
  }

  return (
    <form onSubmit={createNewPost}>
      {showError('title')}
      {showAuthError()}
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {showError('summary')}
      <input
        type='text'
        placeholder='Summary'
        value={summary}
        onChange={e => setSummary(e.target.value)}
      />
      <input type='file' onChange={e => setFile(e.target.files[0])} />
      {showError('content')}
      <Editor value={content} onChange={setContent} />
      <button style={{ margin: '10px 0' }} type='submit' onClick={handleOpen}>
        Submit
      </button>
    </form>
  );
};

export default CreatePost;
