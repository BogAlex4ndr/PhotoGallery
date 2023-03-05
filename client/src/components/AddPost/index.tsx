import React, { useRef } from 'react';
import axios from '../../axios';

const AddPost = () => {
  const inputFilleRef: any = useRef();

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      console.log(data);
    } catch (error) {
        console.warn(error)
        alert('Error upload file')
    }
  };
  return (
    <div>
      <input type='file' ref={inputFilleRef} onChange={handleChangeFile} hidden />
      <button onClick={() => inputFilleRef.current.click()}>upload image</button>
    </div>
  );
};

export default AddPost;
