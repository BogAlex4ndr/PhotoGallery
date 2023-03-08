import { useState } from 'react';
import Header from './components/Header';
import './App.scss';
import Admin from './components/Admin';
import AddPost from './components/AddPost';
import FullPost from './components/Fullpost/idex';
import Post from './components/Post';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import { useDispatch } from 'react-redux';
import React from 'react';
import { fechAuthMe } from './redux/slices/auth';

function App() {
  
  return (
    <div className='App'>
      <Header />
      {/* <Admin />
      <AddPost /> */}
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<FullPost />} />
      </Routes>
    </div>
  );
}

export default App;
