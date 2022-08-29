import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeProperty, makeFakeUserData } from '../../mocks';
import Header from './header';
import userEvent from '@testing-library/user-event';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import PrivateRoute from '../private-route/private-route';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockUserData = makeFakeUserData();

const storeAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: mockUserData,
  },
  [NameSpace.Favorites]: {favorites: [makeFakeProperty(), makeFakeProperty()]},
});

const storeNoAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null,
  },
  [NameSpace.Favorites]: {favorites: [makeFakeProperty(), makeFakeProperty()]},
});

describe('Component: Header', () => {

  it('should redirect to MainScreen when user clicks on Logo', async () => {
    render(
      <Provider store={storeAuth}>
        <MemoryRouter
          initialEntries={[{ pathname: AppRoute.Login }]}
          initialIndex={0}
        >
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<Header />}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>Mock MainScreen</h1>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Mock MainScreen/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('logo-link'));

    expect(screen.getByText(/Mock MainScreen/i)).toBeInTheDocument();
  });

  it('should render without UserProfile when on LoginScreen', () => {
    render(
      <Provider store={storeAuth}>
        <MemoryRouter>
          <Header isLoginPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.queryByTestId('user')).not.toBeInTheDocument();
  });

  it('should render with UserProfile when not on LoginScreen', () => {
    render(
      <Provider store={storeAuth}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('user')).toBeInTheDocument();
    expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
  });

  describe('Component: Header without authorization', () => {
    it('should redirect to LoginScreen when user clicks on user profile', async () => {
      render(
        <Provider store={storeNoAuth}>
          <MemoryRouter>
            <Routes>
              <Route
                path={AppRoute.Main}
                element={<Header />}
              />
              <Route
                path={AppRoute.Favorites}
                element={
                  <PrivateRoute>
                    <h1>Mock FavoritesScreen</h1>
                  </PrivateRoute>
                }
              />
              <Route
                path={AppRoute.Login}
                element={<h1>Mock LoginScreen</h1>}
              />
            </Routes>
          </MemoryRouter>
        </Provider>
      );

      expect(screen.queryByText(/Mock LoginScreen/i)).not.toBeInTheDocument();

      await userEvent.click(screen.getByTestId('favorites-link'));

      expect(screen.getByText(/Mock LoginScreen/i)).toBeInTheDocument();
    });

    it('should redirect to LoginScreen when user clicks on "Sign In"', async () => {
      render(
        <Provider store={storeNoAuth}>
          <MemoryRouter>
            <Routes>
              <Route
                path={AppRoute.Main}
                element={<Header />}
              />
              <Route
                path={AppRoute.Login}
                element={<h1>Mock LoginScreen</h1>}
              />
            </Routes>
          </MemoryRouter>
        </Provider>
      );

      expect(screen.queryByText(/Mock LoginScreen/i)).not.toBeInTheDocument();

      await userEvent.click(screen.getByTestId('signin-link'));

      expect(screen.getByText(/Mock LoginScreen/i)).toBeInTheDocument();
    });
  });

  describe('Component: Header with authorization', () => {
    it('should redirect to FavoritesScreen when user clicks on user profile', async () => {
      render(
        <Provider store={storeAuth}>
          <MemoryRouter>
            <Routes>
              <Route
                path={AppRoute.Main}
                element={<Header />}
              />
              <Route
                path={AppRoute.Favorites}
                element={<h1>Mock FavoritesScreen</h1>}
              />
            </Routes>
          </MemoryRouter>
        </Provider>
      );

      expect(screen.queryByText(/Mock FavoritesScreen/i)).not.toBeInTheDocument();

      await userEvent.click(screen.getByTestId('favorites-link'));

      expect(screen.getByText(/Mock FavoritesScreen/i)).toBeInTheDocument();
    });

    it('should invoke logoutAction when user clicks on "Sign Out"', async () => {
      render(
        <Provider store={storeAuth}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('signout-link'));

      const actions = storeAuth.getActions();
      expect(actions[0].type).toBe('user/logout/pending');
    });
  });
});
