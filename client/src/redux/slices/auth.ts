import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData: any = createAsyncThunk('auth/fetchUserData', async (params: any) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fechAuthMe: any = createAsyncThunk('auth/fechAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const initialState: any = {
  data: null,
  status: 'loading',
};

const authSlice: any = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
    builder.addCase(fechAuthMe.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fechAuthMe.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fechAuthMe.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
  },
});

export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
