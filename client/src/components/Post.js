import React from 'react';

const Post = () => {
  return (
    <div className='post'>
      <div className='image'>
        <img
          src='https://lh5.googleusercontent.com/BakTOAxbDkWhWwiz0YBtXRSTiFMVXXaK7JGzWqZ73rz4UU6S0SSCHXyef19lo5-cMT6JJ83cCREIeGRGfKvauv5ED4x2qjdGxaRob9R5UxuweIelVMUXAJ6D_rPgyJYkLRD4Xt-nMGic1D0XG5ByUM0'
          alt=''
        />
      </div>
      <div className='texts'>
        <h2>
          Build a Fullstack Blog App using MERN (mongo, express, react, node)
        </h2>
        <p className='info'>
          <a href='' className='author'>
            John Doe
          </a>
          <time>2023-11-08 11:57</time>
        </p>
        <p className='summary'>
          In this tutorial, I'm going to show you how to build a fullstack blog
          app using MERN (mongo, express, react, node). This blog app tutorial
          is designed for beginners and will teach you the basics of building a
          blog app using MERN. By the end of this tutorial, you will have a
          working blog app that you can use to publish your blog content.
        </p>
      </div>
    </div>
  );
};

export default Post;
