import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectAuthorizationStatus = (state: State) => state[NameSpace.Auth].authorizationStatus;
export const selectUserInfo = (state: State) => state[NameSpace.Auth].userInfo;
