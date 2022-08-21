import { AuthorizationStatus, LoadingStatus } from '../../const';
import { makeFakeUserData } from '../../mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { authSlice, AuthSlice } from './auth-slice';

const mockUserData = makeFakeUserData();

describe('Reducer: authSlice', () => {
  let state: AuthSlice;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
      loginStatus: LoadingStatus.Idle,
      logoutStatus: LoadingStatus.Idle
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(authSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userInfo if checkAuthAction is fulfilled',
      () => {
        expect(authSlice.reducer(state, {payload: mockUserData, type: checkAuthAction.fulfilled.type}))
          .toEqual({
            ...state,
            authorizationStatus: AuthorizationStatus.Auth,
            userInfo: mockUserData
          });
      });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction is rejected',
      () => {
        expect(authSlice.reducer(state, {type: checkAuthAction.rejected.type}))
          .toEqual({
            ...state,
            authorizationStatus: AuthorizationStatus.NoAuth,
          });
      });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH", loginStatus to "fulfilled" and set userInfo if loginAction is fulfilled',
      () => {
        expect(authSlice.reducer(state, {payload: mockUserData, type: loginAction.fulfilled.type}))
          .toEqual({
            ...state,
            authorizationStatus: AuthorizationStatus.Auth,
            userInfo: mockUserData,
            loginStatus: LoadingStatus.Fulfilled,
          });
      });

    it('should update authorizationStatus to "NO_AUTH" and loginStatus to "rejected" if loginAction is rejected',
      () => {
        expect(authSlice.reducer(state, {type: loginAction.rejected.type}))
          .toEqual({
            ...state,
            authorizationStatus: AuthorizationStatus.NoAuth,
            loginStatus: LoadingStatus.Rejected,
          });
      });

    it('should update loginStatus to "pending" if loginAction is pending',
      () => {
        expect(authSlice.reducer(state, {type: loginAction.pending.type}))
          .toEqual({
            ...state,
            loginStatus: LoadingStatus.Pending,
          });
      });
  });

  describe('logoutAction test', () => {
    it('should update logoutStatus to "fulfilled", authorizationStatus to "NO_AUTH" and reset userInfo if logoutAction is fulfilled',
      () => {
        expect(authSlice.reducer(state, {type: logoutAction.fulfilled.type}))
          .toEqual({
            ...state,
            authorizationStatus: AuthorizationStatus.NoAuth,
            userInfo: null,
            logoutStatus: LoadingStatus.Fulfilled
          });
      });

    it('should update logoutStatus to "rejected" if logoutAction is rejected',
      () => {
        expect(authSlice.reducer(state, {type: logoutAction.rejected.type}))
          .toEqual({
            ...state,
            logoutStatus: LoadingStatus.Rejected
          });
      });

    it('should update logoutStatus to "pending" if logoutAction is pending',
      () => {
        expect(authSlice.reducer(state, {type: logoutAction.pending.type}))
          .toEqual({
            ...state,
            logoutStatus: LoadingStatus.Pending
          });
      });
  });

});
