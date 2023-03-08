import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { logout } from '../../redux/slices/auth';
import Home from '../Home';

const AddPost = () => {
  const [imageUrl, setImageUrl]: any = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName]: any = useState();

  const inputFilleRef: any = useRef();

  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm('are you sure?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
      setFileName(file.name);
    } catch (error) {
      console.warn(error);
      alert('Error upload file');
    }
  };

  const onSubmitImage = async () => {
    try {
      if (imageUrl === undefined) {
        return alert('add image');
      } else {
        setIsLoading(true);
        const fields = {
          imageUrl: `http://localhost:4444${imageUrl}`,
        };

        const { data } = await axios.post('/posts', fields);
      }
    } catch (err) {
      console.warn(err);
      alert('error upload image');
    }
  };

  const removeImage = () => {
    setImageUrl('');
    axios.post(`/delete-image`, { filename: fileName });
  };
  return (
    <div>
      <div>
        <button onClick={onClickLogout}>Log Out</button>
      </div>
      <div>
        <input type='file' ref={inputFilleRef} onChange={handleChangeFile} hidden />
        <button onClick={() => inputFilleRef.current.click()}>upload image</button>
        {imageUrl && <button onClick={removeImage}>Delete image</button>}
      </div>
      <div>
        <img style={{ maxWidth: '300px' }} src={`http://localhost:4444${imageUrl}`} alt='' />
      </div>
      <div>
        <button onClick={onSubmitImage}>Create post</button>
      </div>
      <div style={{ maxWidth: '1200px', margin: '20px auto' }}>
        <Home />
      </div>
    </div>
  );
};

export default AddPost;
