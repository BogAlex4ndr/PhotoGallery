import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../redux/slices/auth';

type FormData = {
  email: string;
  password: string;
};

const Admin = () => {
  const dispatch = useDispatch();
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
  const onSubmit = handleSubmit((data) => dispatch(fetchUserData(data)));
  return (
    <div>
      <form onSubmit={onSubmit}>
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
    </div>
  );
};

export default Admin;
