import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {changeFavoriteStatusAction, checkAuthAction, fetchFavoritesAction, fetchPropertiesAction, fetchPropertiesNearbyAction, fetchPropertyAction, fetchReviewsAction, loginAction, logoutAction, postReviewAction} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import { AuthData } from '../types/auth-data';
import { redirectToPreviousRoute, redirectToRoute } from './actions';
import { makeFakeProperty, makeFakeReview } from '../mocks';
import { ChangeFavoriteStatusPayload } from '../types/favorites-data';
import { PostReviewPayload } from '../types/property-form';

const MOCK_ID = 1;

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should update authorization status to «auth» and dispatch fetchFavoritesAction when server returns 200',
    async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        fetchFavoritesAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

  it('should dispatch redirectToPreviousRoute, fetchPropertiesAction, fetchFavoritesAction when POST /login',
    async () => {
      const fakeUser: AuthData = {email: 'test@test.ru', password: '1q'};

      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, {token: 'secret'});


      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToPreviousRoute.type,
        fetchPropertiesAction.pending.type,
        fetchFavoritesAction.pending.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
    });

  it('should dispatch logoutAction when DELETE /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      fetchPropertiesAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch fetchPropertiesAction when GET /hotels', async () => {
    const mockProperties = [makeFakeProperty(), makeFakeProperty()];
    mockAPI
      .onGet(APIRoute.Properties)
      .reply(200, mockProperties);

    const store = mockStore();

    await store.dispatch(fetchPropertiesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPropertiesAction.pending.type,
      fetchPropertiesAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPropertyAction, fetchPropertiesNearbyAction, fetchReviews when GET /hotels/id',
    async () => {
      const mockProperty = makeFakeProperty();
      mockAPI
        .onGet(`${APIRoute.Properties}/${MOCK_ID}`)
        .reply(200, mockProperty);

      const store = mockStore();

      await store.dispatch(fetchPropertyAction(MOCK_ID));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchPropertyAction.pending.type,
        fetchPropertiesNearbyAction.pending.type,
        fetchReviewsAction.pending.type,
        fetchPropertyAction.fulfilled.type
      ]);
    });

  it('should dispatch fetchPropertiesNearbyAction when GET /hotels/id/nearby', async () => {
    const mockProperties = [makeFakeProperty(), makeFakeProperty(), makeFakeProperty()];
    mockAPI
      .onGet(`${APIRoute.Properties}/${MOCK_ID}/nearby`)
      .reply(200, mockProperties);

    const store = mockStore();

    await store.dispatch(fetchPropertiesNearbyAction(MOCK_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPropertiesNearbyAction.pending.type,
      fetchPropertiesNearbyAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFavoritesAction when GET /favorites', async () => {
    const mockProperties = [makeFakeProperty(), makeFakeProperty(), makeFakeProperty()];
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, mockProperties);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type
    ]);
  });

  it('should dispatch changeFavoriteStatusAction when POST /favorites/id/status', async () => {
    const fakeProperty = {...makeFakeProperty(), isFavorite: 1};
    const fakeChangeFavoriteStatusPayload: ChangeFavoriteStatusPayload = {
      status: 0,
      propertyId: MOCK_ID
    };
    const {status, propertyId} = fakeChangeFavoriteStatusPayload;
    mockAPI
      .onPost(`${APIRoute.Favorites}/${propertyId}/${status}`)
      .reply(200, fakeProperty);

    const store = mockStore();

    await store.dispatch(changeFavoriteStatusAction(fakeChangeFavoriteStatusPayload));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavoriteStatusAction.pending.type,
      changeFavoriteStatusAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /reviews/id', async () => {
    const mockProperties = [makeFakeProperty(), makeFakeProperty(), makeFakeProperty()];
    mockAPI
      .onGet(`${APIRoute.Reviews}/${MOCK_ID}`)
      .reply(200, mockProperties);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(MOCK_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch postReviewAction when POST /reviews/id', async () => {
    const fakeReviews = [makeFakeReview(), makeFakeReview()];
    const fakePostReviewPayload: PostReviewPayload = {
      propertyId: MOCK_ID,
      comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      rating: '3'
    };
    const {propertyId, comment, rating} = fakePostReviewPayload;
    mockAPI
      .onPost(`${APIRoute.Reviews}/${propertyId}`, {comment, rating})
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(postReviewAction({propertyId, comment, rating}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type,
    ]);
  });
});
