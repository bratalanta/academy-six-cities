import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {AppRoute} from '../../const';
import {State} from '../../types/state';
import { redirectToPreviousRoute, redirectToRoute } from '../actions';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirected to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });

  it('should not to be redirected to /hotels because of bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Property});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Property);
  });

  it('should be redirected to previous page', () => {
    store.dispatch(redirectToRoute(AppRoute.Property));
    store.dispatch(redirectToRoute(AppRoute.Main));
    store.dispatch(redirectToPreviousRoute());

    expect(fakeHistory.location.pathname).toBe(AppRoute.Property);

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Property),
      redirectToRoute(AppRoute.Main),
      redirectToPreviousRoute()
    ]);
  });
});
