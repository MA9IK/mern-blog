import React, { useEffect, useState } from 'react';
import Editor from '../components/Editor';
import { Navigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFile] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      });
  }, []);

  async function UpdatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files);
    // if (files?.[0]) {
    //   data.set('file', files?.[0]);
    // }
    await fetch(`http://localhost:5000/post/${id}`, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    });

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={UpdatePost}>
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
      <Editor value={content} onChange={setContent} />
      <button style={{ margin: '10px 0' }} type='submit'>
        Submit
      </button>
    </form>
  );
};

export default EditPost;
