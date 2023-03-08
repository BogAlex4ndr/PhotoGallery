import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRemovePost } from '../../redux/slices/postSlice';
import styles from '../Home/Home.module.scss';
import axios from '../../axios';

const Post = ({ _id, imageUrl }) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
     dispatch(fetchRemovePost(_id));
    axios.post(`/delete-image`, {
      filename: imageUrl.replace('http://localhost:4444/uploads/', ''),
    });
  };
  return (
    <div className={styles.imageConteiner} key={_id}>
      <button onClick={onClickRemove}>Remove</button>
      <Link to={`/posts/${_id}`}>
        <img src={imageUrl} alt='Image' />
      </Link>
    </div>
  );
};

export default Post;
