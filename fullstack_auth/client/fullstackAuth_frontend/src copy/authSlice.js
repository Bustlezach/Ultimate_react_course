import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
          state.accessToken = action.payload.accessToken;
            state.user = action.payload;
        },
        logout: (state) => {
          state.accessToken = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;