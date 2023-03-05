import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Home/Home.module.scss';

const Post = ({ _id, imageUrl }) => {
  console.log('id from post', _id);
  return (
    <div className={styles.imageConteiner} key={_id}>
      <Link to={`/posts/${_id}`}>
        <img src={imageUrl} alt='Image' />
      </Link>
    </div>
  );
};

export default Post;
