import { configureStore, createSlice } from '@reduxjs/toolkit';

interface IApiUrlState {
  url: string;
}

const initialState: IApiUrlState = {
  url: process.env.GATSBY_API_URL!,
};

const apiUrlSlice = createSlice({
  name: 'apiUrl',
  initialState,
  reducers: {},
});

interface IAdminState {
  name: string;
  pic: string;
  id: string;
}

const adminInitialState: IAdminState = {
  name: '',
  pic: '',
  id: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: adminInitialState,
  reducers: {
    login(state, action) {
      state.name = action.payload.name;
      state.pic = action.payload.pic;
      state.id = action.payload.id;
    },
    logout(state) {
      state.name = '';
      state.pic = '';
      state.id = '';
    },
  },
});

const store = configureStore({
  reducer: {
    apiUrl: apiUrlSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const adminActions = adminSlice.actions;
export default store;
