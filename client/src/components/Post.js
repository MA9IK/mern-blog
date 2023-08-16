import React, { useContext } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ _id, title, summary, content, file, createdAt, author }) => {
  return (
    <div className='post'>
      <Link
        to={`/post/${_id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='image'>
          <img src={'http://localhost:5000/' + file} alt='' />
        </div>
      </Link>
      <div className='texts'>
        <Link
          to={`/post/${_id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>{title}</h2>
        </Link>
        <p className='info'>
          <a href='' className='author'>
            {author.username}
          </a>
          <time>{format(new Date(createdAt), 'MMMM dd, yyyy, H:mm a')}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
};
export default Post;
