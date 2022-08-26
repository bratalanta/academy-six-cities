import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AuthorizationStatus, AppRoute, DEFAULT_CITY, SortOption, LoadingStatus, NameSpace} from '../../const';
import App from './app';
import { makeFakeProperty, makeFakeReview, makeFakeUserData } from '../../mocks';
import { generatePath } from 'react-router-dom';

const mockStore = configureMockStore();
const mockProperty = {...makeFakeProperty(), id: 1, city: DEFAULT_CITY};
const mockReview = makeFakeReview();
const mockUserData = makeFakeUserData();

const storeAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: mockUserData,
    loginStatus: LoadingStatus.Fulfilled,
    logoutStatus: LoadingStatus.Idle
  },
  [NameSpace.Favorites]: {
    favorites: [mockProperty]
  },
  [NameSpace.App]: {
    currentCity: DEFAULT_CITY,
    currentSortOption: SortOption.POPULAR
  },
  [NameSpace.Properties]: {
    properties: [mockProperty],
    propertiesNearby: [mockProperty],
    propertiesLoadingStatus: LoadingStatus.Fulfilled,
    propertyLoadingStatus: LoadingStatus.Fulfilled,
    property: mockProperty
  },
  [NameSpace.Reviews]: {
    reviews: [mockReview],
    postingStatus: LoadingStatus.Idle,
  }
});

const storeNoAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null,
    loginStatus: LoadingStatus.Fulfilled,
    logoutStatus: LoadingStatus.Idle
  },
  [NameSpace.Favorites]: {
    favorites: [mockProperty]
  },
  [NameSpace.App]: {
    currentCity: DEFAULT_CITY,
    currentSortOption: SortOption.POPULAR
  },
  [NameSpace.Properties]: {
    properties: [mockProperty],
    propertiesNearby: [mockProperty],
    propertiesLoadingStatus: LoadingStatus.Fulfilled,
    propertyLoadingStatus: LoadingStatus.Fulfilled,
    property: mockProperty
  },
  [NameSpace.Reviews]: {
    reviews: [mockReview],
    postingStatus: LoadingStatus.Idle,
  }
});

window.scrollTo = jest.fn();
storeAuth.dispatch = jest.fn();
storeNoAuth.dispatch = jest.fn();

const history = createMemoryHistory();

const fakeAuthApp = (
  <Provider store={storeAuth}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

const fakeNoAuthApp = (
  <Provider store={storeNoAuth}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user is navigated to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeAuthApp);

    expect(screen.getByText(/places to stay in Paris/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user is navigated to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeAuthApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" with "Favorites" if favorites is not empty when user is navigated to "/favorites"',
    () => {
      history.push(AppRoute.Favorites);

      render(fakeAuthApp);

      expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    });

  it('should render "FavoritesScreen" with "NoFavorites" if favorites is empty when user is navigated to "/favorites"',
    () => {
      storeAuth.getState()[NameSpace.Favorites].favorites = [];
      history.push(AppRoute.Favorites);

      render(fakeAuthApp);

      expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
      expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
    });

  it('should redirect to "/login" and render "LoginScreen" if authorizationStatus is "no_auth" when user wants to be navigated to "/favorites"',
    () => {
      history.push(AppRoute.Favorites);

      render(fakeNoAuthApp);

      expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
      expect(screen.getByText(/Password/i)).toBeInTheDocument();
    });

  it('should render "PropertyScreen" with "PropertyForm" if authorizationStatus is "auth" when user is navigated to "/room/id"',
    () => {
      history.push(generatePath(AppRoute.Property, { id: `${mockProperty.id}`}));

      render(fakeAuthApp);

      expect(screen.getByText(`${mockProperty.description}`)).toBeInTheDocument();
      expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
      expect(screen.getByText(/Your review/i)).toBeInTheDocument();
      expect(screen.getByText(`${mockUserData.email}`)).toBeInTheDocument();
    });

  it('should render "PropertyScreen" without "PropertyForm" if authorizationStatus is "no_auth" when user is navigated to "/room/id"',
    () => {
      history.push(generatePath(AppRoute.Property, { id: `${mockProperty.id}`}));

      render(fakeNoAuthApp);

      expect(screen.getByText(`${mockProperty.description}`)).toBeInTheDocument();
      expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
      expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    });

  it('should render "NotFoundScreen" when user is navigated to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeAuthApp);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to home page/i)).toBeInTheDocument();
  });
});
