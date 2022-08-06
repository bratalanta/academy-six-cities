import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectAuthorizationStatus = (state: State) => state[NameSpace.Auth].authorizationStatus;
export const selectUserInfo = (state: State) => state[NameSpace.Auth].userInfo;
export const selectLoginStatus = (state: State) => state[NameSpace.Auth].loginStatus;
export const selectLogoutStatus = (state: State) => state[NameSpace.Auth].logoutStatus;
