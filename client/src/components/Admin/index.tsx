import React from 'react';
import AddPost from '../AddPost';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fechAuthMe, fetchUserData, selectIsAuth } from '../../redux/slices/auth';

type FormData = {
  email: string;
  password: string;
};

const Admin = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fechAuthMe());
  }, []);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: 'alex@gmail.com',
      password: '12345',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      return alert('some problem here');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  console.log('auth', isAuth);
  return (
    <div>
      {!window.localStorage.getItem('token') && !isAuth ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            aria-label='E-mail'
            autoComplete='off'
            type='email'
            placeholder={errors.email?.message}
            {...register('email', { required: 'enter email' })}></input>
          <input
            type='password'
            aria-label='Password'
            autoComplete='off'
            placeholder={errors.password?.message}
            {...register('password', { required: 'password' })}></input>
          <button type='submit'>Enter</button>
        </form>
      ) : (
        <AddPost />
      )}
    </div>
  );
};

export default Admin;
