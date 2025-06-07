import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialStateUser {
  email: string | null;
  schedule_id: string | null;
  role: 'admin' | 'teacher' | null;
  username: string | null;
  post: string | null;
  password: string | null;
  id: string | null;
}

const initialState: IInitialStateUser = {
  email: null,
  schedule_id: null,
  role: null,
  username: null,
  post: null,
  password: null,
  id: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IInitialStateUser>) => {
      /* eslint-disable no-param-reassign */
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.post = action.payload.post;
      state.schedule_id = action.payload.schedule_id;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.email = null;
      state.username = null;
      state.role = null;
      state.schedule_id = null;
      state.post = null;
      state.password = null;
      state.id = null;
    }
    /* elsint-enable no-param-reassign */
  }
});

const { reducer, actions } = userSlice;

export default reducer;

export const { setUser, removeUser } = actions;
