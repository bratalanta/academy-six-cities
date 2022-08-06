import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, LoadingStatus, NameSpace } from '../../const';
import { UserData } from '../../types/user-data';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

type AuthSlice = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
  loginStatus: LoadingStatus;
  logoutStatus: LoadingStatus;
}

const initialState: AuthSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  loginStatus: LoadingStatus.Idle,
  logoutStatus: LoadingStatus.Idle
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
        state.loginStatus = LoadingStatus.Fulfilled;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loginStatus = LoadingStatus.Rejected;
      })
      .addCase(loginAction.pending, (state) => {
        state.loginStatus = LoadingStatus.Pending;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
        state.logoutStatus = LoadingStatus.Fulfilled;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.logoutStatus = LoadingStatus.Rejected;
      })
      .addCase(logoutAction.pending, (state) => {
        state.logoutStatus = LoadingStatus.Pending;
      });
  }
});
