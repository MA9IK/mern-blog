import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Navigate } from 'react-router-dom';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);

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

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Summary'
        value={summary}
        onChange={e => setSummary(e.target.value)}
      />
      <input type='file' onChange={e => setFile(e.target.files[0])} />
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

export default EditPost;
