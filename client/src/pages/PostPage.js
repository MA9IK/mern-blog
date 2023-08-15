import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';

const PostPage = () => {
  document.title = 'Post Page';
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/post/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post || !user) {
    return null;
  }

  const formattedDate = format(
    new Date(post.createdAt),
    'MMMM dd, yyyy, HH:mm a'
  );

  return (
    <div className='post-page'>
      <h1 style={{ textAlign: 'center', margin: '0' }}>{post.title}</h1>
      <time
        style={{
          textAlign: 'center',
          display: 'block',
          fontSize: '0.8rem',
          margin: '10px 0 5px',
          color: 'gray'
        }}>
        {formattedDate}
      </time>
      <div
        style={{
          textAlign: 'center',
          margin: '10px 0',
          fontSize: '0.7rem',
          fontWeight: 'bold'
        }}>
        by @{post.author.username}
      </div>
      {user.id === post.author._id && (
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Link
            to={`/edit/${post._id}`}
            style={{
              backgroundColor: '#333',
              display: 'inline-block',
              color: '#fff',
              padding: '5px 20px',
              borderRadius: '5px',
              fontSize: '0.8rem',

              textDecoration: 'none'
            }}>
            Edit
          </Link>
        </div>
      )}
      <div
        style={{ direction: 'flex', overflow: 'hidden', maxHeight: '300px' }}>
        <img
          src={`http://localhost:5000/${post.file}`}
          alt=''
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            width: '100%',
            height: '100%',
            margin: '0 auto'
          }}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostPage;
