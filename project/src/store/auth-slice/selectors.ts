import { createSelector } from 'reselect';
import { AuthorizationStatus, LoadingStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectAuthorizationStatus = (state: State) => state[NameSpace.Auth].authorizationStatus;
export const selectUserInfo = (state: State) => state[NameSpace.Auth].userInfo;
export const selectLoginStatus = (state: State) => state[NameSpace.Auth].loginStatus;
export const selectLogoutStatus = (state: State) => state[NameSpace.Auth].logoutStatus;

export const authSelector = createSelector(
  [selectLoginStatus, selectLogoutStatus, selectAuthorizationStatus],
  (loginStatus, logoutStatus, authStatus) => (
    {
      isLogoutStatusPending: [LoadingStatus.Pending, LoadingStatus.Idle].includes(logoutStatus),
      isLoginStatusPending: [LoadingStatus.Pending, LoadingStatus.Idle].includes(loginStatus),
      isUserAuthorized: authStatus === AuthorizationStatus.Auth,
    }
  ));
