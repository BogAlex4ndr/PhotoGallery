import axios from '../../axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../Post';

interface PostData {
  _id: string;
  imageUrl: string;
}

const FullPost = () => {
  const [data, setData] = useState<PostData>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  console.log('Full post id', id);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        console.log('this is data', res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('error loading full post');
      });
  }, []);

  if (isLoading) {
    return <div />;
  }

  return <Post _id={data._id} imageUrl={data.imageUrl} />;
};

export default FullPost;
