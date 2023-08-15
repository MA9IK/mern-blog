import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

const IndexPage = () => {
  const [posts, setPost] = useState([]);

  document.title = 'Home Page';

  useEffect(() => {
    fetch('http://localhost:5000/post').then(res => {
      res.json().then(data => {
        setPost(data);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map(post => <Post {...post} key={post._id} />)}
    </>
  );
};

export default IndexPage;
