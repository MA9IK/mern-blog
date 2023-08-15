import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState([]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];

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
    const { errors } = info;
    setErrors(errors);
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

  return (
    <form onSubmit={createNewPost}>
      {showError('title')}
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
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={e => setContent(e)}
      />
      <button style={{ margin: '10px 0' }} type='submit'>
        Submit
      </button>
    </form>
  );
};

export default CreatePost;
